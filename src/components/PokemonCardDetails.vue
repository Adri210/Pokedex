<script setup>
  import { useStore } from 'vuex';
  import { computed, ref, watchEffect } from 'vue';
  import { RouterLink } from 'vue-router';
  import { getCardColors } from '@/utils/cardColors.js';
  import { getBadgeType } from '@/utils/badgeTypes.js';
  import { formatGameIndices } from '@/utils/formatGameIndices.js';
  import PokemonStats from './PokemonStats.vue';
  import PokemonEvolutions from './PokemonEvolutions.vue';
  import PokemonMoves from './PokemonMoves.vue';

  const { getters } = useStore();

  const cardColor = ref('');
  const badges = ref([]);
  const gameIndices = ref([]);
  
  const pokemon = computed(() => getters['getPokemon']);
  
  watchEffect(() => {
    if (pokemon.value && pokemon.value.types && pokemon.value.types.length > 0) {
      cardColor.value = getCardColors(pokemon.value.types[0].type.name);
      
      badges.value = pokemon.value.types.map((type) => {
        return getBadgeType(type.type.name);
      })

      gameIndices.value = formatGameIndices(pokemon.value.game_indices);
    }
  });
</script>

<template>
  <section
    class="cards-container h-100 row m-auto align-items-center w-75 rounded-top-4 py-4 px-3 position-relative"
    :style="[
      `border-color: ${cardColor}`,
      `backgroundColor: ${cardColor}`
    ]"
  >
    <RouterLink to="/pokemons" class="back-btn btn position-absolute d-flex justify-content-center align-items-center">
      <img src="@/assets/images/icons/chevron-left.svg" alt="icon" class="w-50">
    </RouterLink>

    <div class="col col-12 col-lg-6 d-flex flex-column align-items-center">
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
        class="w-50"
        alt="Imagem Oficial do Pokémon"
      />
    </div>

    <PokemonStats
      :cardColor="cardColor"
      :badges="badges"
      :gameIndices="gameIndices"
      :pokemon="pokemon"
    />

    <PokemonEvolutions />
    
    <PokemonMoves
      :moves="pokemon?.moves"
      :cardColor="cardColor"
    />
  </section>
</template>

<style lang="scss" scoped>
  .cards-container {
    overflow-y: scroll;
    scrollbar-width: none; 
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .back-btn {
    width: 3rem;
    height: 3rem;
    top: 1.5rem;
    left: 1.5rem;
    border-radius: 50%;
    background-color: $pink-400;

    &:hover {
      background-color: #fff;
    }
  }

  @media(max-width: 720px) {
    .row {
      width: 100% !important;
    }
  }
</style>