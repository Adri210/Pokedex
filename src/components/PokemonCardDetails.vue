<script setup>
  import { useStore } from 'vuex';
  import { computed, ref, watchEffect } from 'vue';
  import { RouterLink } from 'vue-router';
  import { getCardColors } from '@/utils/cardColors.js';
  import { getBadgeType } from '@/utils/badgeTypes.js';
  import { formatGameIndices } from '@/utils/formatGameIndices.js';

  const { getters } = useStore();

  const cardColor = ref('');
  const badges = ref([]);
  const gameIndices = ref([]);
  
  const pokemon = computed(() => getters['getPokemon']);
  const evolutions = computed(() => getters['getEvolutions']);
  
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
    class="cards-container h-100 row m-auto w-75 rounded-top-4 py-4 px-3 position-relative"
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
          alt="Sprite 1"
        />
    </div>

    <div class="col col-12 col-xl-6 h-75">
      <div class="card bg-white rounded-4 p-4 d-flex flex-column gap-2">
        <div class="d-flex align-items-center gap-2">
          <h4>- Name:</h4>
          <h3>{{ pokemon.name }}</h3>
        </div>

        <div class="d-flex align-items-center gap-2">
          <h4>- Types:</h4>
          <div class="d-flex gap-2 align-items-center">
            <img
              v-for="badge in badges"
              :key="badge"
              :src="badge"
              alt="badge"
            />
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <h4>- Height:</h4>
          <h3>{{ pokemon.height }}</h3>
        </div>

        <div class="d-flex align-items-center gap-2">
          <h4>- Weight:</h4>
          <h3>{{ pokemon.weight }}</h3>
        </div>

        <div class="d-flex flex-column align-items-center gap-2 mt-4">
          <h3>Abilities:</h3>
          
          <div class="d-flex align-items-center gap-2">
            <div
              v-for="ability in pokemon.abilities"
              :key="ability.ability.name"
              class="ability py-1 px-2 rounded-3"
              :style="[`backgroundColor: ${cardColor}`]"
            >
              <span>{{ ability.ability.name }}</span>
            </div>
          </div>
        </div>

        <div class="d-flex flex-grow-1 flex-column gap-2 mt-4">
          <h2>Game Indices:</h2>
          
          <div class="d-flex flex-column gap-2">
            <p
              v-for="indice in gameIndices"
              :key="indice"
            >
              <span>{{ indice }}</span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-center gap-2 flex-grow-1 flex-column mt-4">
          <h2>Moves:</h2>
          
          <div class="d-flex justify-content-center gap-2 flex-wrap">
            <div
              v-for="move in pokemon.moves"
              :key="move.move.name"
              class="ability py-1 px-2 rounded-3"
              :style="[`backgroundColor: ${cardColor}`]"
            >
              <span>{{ move.move.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 col-xl-6 d-flex align-items-center gap-4">
      <div
        v-for="evolution in evolutions"
        :key="evolution.id"
        class="d-flex flex-column justify-content-center"
      >
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`"
          alt="Evolution"
          class="evolution-img w-50"
        >
        <p>{{ evolution.name }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  p, h3, h4 {
    margin: 0;
  }

  .cards-container {
    overflow-y: scroll;
    scrollbar-width: none; 
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .pokeball-loading {
    width: 40rem;
  }

  .carousel {
    width: 70%;
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

  .ability {
    text-transform: capitalize;
    color: #fff;
  }

  @media(max-width: 720px) {
    .row {
      width: 100% !important;
    }
  }
</style>