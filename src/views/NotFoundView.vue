<template>
  <main class="vw-100 vh-100">
    <HeaderComponent />
    <div class="notfound-container d-flex flex-column align-items-center justify-content-center">
      <img src="@/assets/images/gifs/not-found.gif" alt="Not Found" class="w-50" />
      <h1 class="mt-5">Ops, nenhum Pokémon por aqui ;-;</h1>
      <p>A página que você está procurando não existe.</p>

      <RouterLink to="/" class="btn btn-primary mt-5">
        Voltar ao início
      </RouterLink>
    </div>
  </main>
</template>

<script setup>
  import HeaderComponent from '@/components/HeaderComponent.vue';
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
  main {
    background-color: $pink-700;
  }

  .notfound-container {
    height: calc(100% - 5rem);
  }

  .btn-primary {
    background-color: $green-400;
    border-color: $green-400;
    font-weight: 700;
    text-align: center;

    &:hover {
      background-color: $blue-400;
      border-color: $blue-400;
    }
  }

  @media(max-width: 720px) {
    h1 {
      font-size: 1.25rem;
    }
  }
</style>