<script setup>
  import PokemonsList from '@/components/PokemonList.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import AsideComponent from '@/components/AsideComponent.vue';
</script>

<template>
  <HeaderComponent />
  
  <main class="d-flex">
    <AsideComponent />
    <PokemonsList />
    <AsideComponent />
  </main>
</template>

<style lang="scss" scoped>
  main {
    height: calc(100vh - 5rem);
    background-color: $pink-700;
  }
</style>