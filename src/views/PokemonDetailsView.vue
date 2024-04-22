<script setup>
  import { onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import AsideComponent from '@/components/AsideComponent.vue';
  import PokemonCardDetails from '@/components/PokemonCardDetails.vue';

  const { dispatch } = useStore();
  const { params } = useRoute();

  onMounted(async() => {
    await dispatch('loadPokemonById', params.id);
    await dispatch('getPokemonEvolutions', params.id);
  })
</script>

<template>
  <HeaderComponent />

  <main class="d-flex">
    <AsideComponent />
    <PokemonCardDetails />
    <AsideComponent />
  </main>
</template>

<style lang="scss" scoped>
  main {
    height: calc(100vh - 5rem);
    background-color: $pink-700;
  }
</style>