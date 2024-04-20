<template>

  <HeaderComponent />
  
  <main>
    <div class="m-auto w-75 h-100 bg-white">
      <div ref="pokemonList" class="cards-container h-100 row p-4">
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :url="pokemon.url" 
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { pokeapi } from '@/axios';
import HeaderComponent from '@/components/HeaderComponent.vue';
import PokemonCard from '../components/PokemonCard.vue';
  const pokemons = ref([]);

  onMounted(async () => {
    const response = await pokeapi.get("/pokemon");

    pokemons.value = response.data.results;
  })
</script>                               

<style lang="scss" scoped>
main {
  background-color: $pink-700;
  overflow: hidden;
  height: calc(100vh - 4rem);
}

.cards-container {
  overflow-y: scroll;
  list-style: none;
}

@media(max-width: 720px) {
  .bg-white {
    width: 100% !important;
  }
}
</style>