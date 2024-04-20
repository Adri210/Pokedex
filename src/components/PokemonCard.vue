<template>
  <div class="col col-lg-3 col-md-6 col-sm-12">
    <div
      class="card rounded-4"
      :style="[
        `border-color: ${cardColors}`,
        `backgroundColor: ${cardColors}`
      ]"
    >
      <div
        class="h-100 w-100 d-flex flex-column align-items-center justify-content-between p-4"
      >
      <img
        class=" align-self-center"
        :src="`https://raw.githubusercontent.com/PokeAPI//sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
        :alt="`Pókemon ${pokemon.name}`"
      >
      <p class="m-0">{{ pokemon.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { pokeapi } from '@/axios';
  import { getCardColors } from '@/utils/cardColors.js';

  const props = defineProps({
    url: { type: String, required: true },
  })

  const cardColors = ref('');

  const pokemon = ref({});
  
  onMounted(async () => {
    const response = await pokeapi.get(props.url);
    pokemon.value = response.data;
    cardColors.value = getCardColors(pokemon.value.types[0].type.name);
  });
</script>

<style lang="scss" scoped>

.card {
  height: 90%;

  img {
    max-height: 12rem;
    max-width: 10rem;
  }
}
</style>