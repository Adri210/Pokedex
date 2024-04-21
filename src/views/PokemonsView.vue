<script setup>
  import { onMounted, ref } from 'vue'
  import { useInfiniteScroll } from '@vueuse/core'
  import { getPokemons } from '@/axios';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import PokemonCard from '@/components/PokemonCard.vue';
  import AsideComponent from '@/components/AsideComponent.vue';
  import FilterCard from '@/components/FilterCard.vue';
  
  const pokemonsToShow = 20;
  const pokemonListEl = ref(null);
  const pokemons = ref([]);
  const loading = ref(false);
  const selectedFilter = ref('Nome');

  onMounted(async () => {
    pokemons.value = await getPokemons(0, pokemonsToShow);
  })

  const getPokemonsOnScroll = async () => {
    loading.value = true;
    await new Promise((res) => setTimeout(res, 1000));

    try {
      const morePokemons = await getPokemons(pokemons.value.length, pokemonsToShow);

      pokemons.value.push(...morePokemons);
    } catch(error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  useInfiniteScroll(
    pokemonListEl,
    async () => {
      await getPokemonsOnScroll();
    },
    { distance: 10 }
  )

  const toggleFilter = (filter) => {
    selectedFilter.value = filter;
  }
</script>

<template>
  <HeaderComponent />
  
  <main class="d-flex">
    <AsideComponent />

    <div class="row m-auto w-75 h-100 bg-white rounded-top-4 py-4 ps-4">
      <FilterCard
        :selectedFilter="selectedFilter"
        @select-filter="toggleFilter"
      />

      <section
        ref="pokemonListEl"
        class="cards-container row col-12 h-100 p-0"
      >
        <PokemonCard
          v-for="(pokemon, index) in pokemons"
          :key="`${pokemon.name}-${index}`"
          :url="pokemon.url" 
        />
  
        <img
          class="loading m-auto d-block"
          src="@/assets/images/pikachu-loading.gif"
          v-show="loading"
        />
      </section>
    </div>
    
    <AsideComponent />
  </main>
</template>

<style lang="scss" scoped>
  main {
    height: calc(100vh - 5rem);
    background-color: $pink-700;
    overflow: hidden;
  }

  .cards-container {
    overflow-y: scroll;
    scrollbar-width: none; 
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .loading {
    width: 10rem;
  }

  @media(max-width: 720px) {
    .row {
      width: 100% !important;
    }
  }
</style>