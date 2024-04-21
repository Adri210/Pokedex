<script setup>
  import { computed, onMounted, ref } from 'vue';
  import { useInfiniteScroll } from '@vueuse/core';
  import { useStore } from 'vuex';
  import PokemonCard from '@/components/PokemonCard.vue';
  import FilterCard from '@/components/FilterCard.vue';
  
  const { dispatch, getters } = useStore();

  const pokemonListEl = ref(null);
  const pokemons = computed(() => getters['getPokemons']);
  const loadingFlags = computed(() => getters['getLoadingFlags']);

  onMounted(async () => {
    await dispatch('loadPokemons');
  })

  useInfiniteScroll(
    pokemonListEl,
    async () => {
      await dispatch('loadPokemonsOnScroll');
    },
    { distance: 5 }
  );
</script>

<template>
  <section
    ref="pokemonListEl"
    class="cards-container h-100 row m-auto w-75 bg-white rounded-top-4 py-4 px-3 justify-content-center"
  >
    <FilterCard />

    <img
      v-if="loadingFlags.allPokemons"
      src="@/assets/images/gifs/pokeball-loading.gif"
      alt="Pokeball loading"
      class="pokeball-loading"
    />

    <div v-else-if="!pokemons.length" class="d-flex flex-column align-items-center">
      <img class="slowpoke-pokemon mb-4" src="@/assets/images/gifs/slowpoke.gif" alt="Slowpoke Pokémon">
      <h3>Nenhum Pokémon encontrado ;-;</h3>
      <h4>tente uma nova pesquisa</h4>
    </div>

    <template v-else>
      <PokemonCard
        v-for="(pokemon, index) in pokemons"
        :key="`${pokemon.name}-${index}`"
        :url="pokemon.url" 
      />
    </template>


    <div
      class="col-12 d-flex justify-content-center"
      v-if="loadingFlags.morePokemons"
    >
      <img
        class="pikachu-loading"
        src="@/assets/images/gifs/pikachu-loading.gif"
      />
    </div>
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

  .pikachu-loading {
    width: 10rem;
  }

  .pokeball-loading {
    width: 40rem;
  }

  .slowpoke-pokemon {
    height: 15rem;
  }

  @media(max-width: 720px) {
    .row {
      width: 100% !important;
    }
  }
</style>