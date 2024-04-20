<script setup>
  import { onMounted, ref } from 'vue'
  import { useInfiniteScroll } from '@vueuse/core'
  import { getPokemons } from '@/axios';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import PokemonCard from '../components/PokemonCard.vue';
import AsideComponent from '../components/AsideComponent.vue';
  
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
    { distance: 10 }
  )
</script>

<template>
  <HeaderComponent />
  
  <main class="d-flex">
    <AsideComponent />
    <section
      ref="pokemonListEl"
      class="cards-container m-auto w-75 h-100 bg-white row p-4 rounded-top-4"
    >
    <div class="col-12">
      <input class="w-100"/>
    </div>

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