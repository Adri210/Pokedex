<script setup>
  import { onMounted, ref } from 'vue'
  import { useInfiniteScroll } from '@vueuse/core'
  import { getPokemons } from '@/axios';
  import PokemonCard from '@/components/PokemonCard.vue';
  import FilterCard from '@/components/FilterCard.vue';
  
  const pokemonsToShow = 20;
  const pokemonListEl = ref(null);
  const pokemons = ref([]);
  const loading = ref(false);

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
    { distance: 5 }
  )
</script>


<template>
  <section
    ref="pokemonListEl"
    class="cards-container h-100 row m-auto w-75 bg-white rounded-top-4 py-4 px-3"
  >
    <FilterCard />
    <PokemonCard
      v-for="(pokemon, index) in pokemons"
      :key="`${pokemon.name}-${index}`"
      :url="pokemon.url" 
    />

    <div
      class="col-12 d-flex justify-content-center"
      v-show="loading"
    >
      <img
        class="loading"
        src="@/assets/images/pikachu-loading.gif"
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

  .loading {
    width: 10rem;
  }

  @media(max-width: 720px) {
    .row {
      width: 100% !important;
    }
  }
</style>