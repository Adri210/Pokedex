<script setup>
  import { onMounted, ref } from 'vue'
  import { getPokemonDetails } from '@/axios';
  import { getCardColors } from '@/utils/cardColors.js';

  const props = defineProps({
    url: { type: String, required: true },
  })

  const cardColor = ref('');

  const pokemon = ref({});
  
  onMounted(async () => {
    pokemon.value = await getPokemonDetails(props.url);
    cardColor.value = getCardColors(pokemon.value.types[0].type.name);
  });
</script>

<template>
  <div class="col col-xl-3 col-lg-4 col-md-6 col-sm-12">
    <div
      class="card rounded-4"
      :style="[
        `border-color: ${cardColor}`,
        `backgroundColor: ${cardColor}`
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

<style lang="scss" scoped>
.col {
  height: 22rem;
}

.card {
  height: 93%;

  img {
    max-height: 12rem;
    max-width: 10rem;
  }
}
</style>