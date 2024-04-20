<script setup>
  import { ref } from 'vue';
  import JigglyPuff from '@/assets/images/icons/jigglypuff.png';
  import PokemonStar from '@/assets/images/icons/pokemon-star.png';
  import JigglyPuffAlt from '@/assets/images/icons/jigglypuff-alt.png';

  const icons = ref([JigglyPuff, PokemonStar, JigglyPuffAlt]);
</script>

<template>
  <aside class="d-flex flex-column align-items-center justify-content-between py-4">
    <img
      v-for="(icon, index) in icons"
      :key="`${icon}-${index}`"
      :src="icon"
      alt="Jigglypuff"
    />
  </aside>
</template>

<style lang="scss" scoped>
  aside {
    width: 12.5%;
  }
  
  img {
    width: 8rem;
    opacity: 0.9;
  }

  @media(max-width: 1024px) {
    img {
      width: 5rem;
    }
  }

  @media(max-width: 980px) {
    aside {
      display: none !important;
    }
  }
</style>
