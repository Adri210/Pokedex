<script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  const { getters } = useStore();
  const evolutions = computed(() => getters['getEvolutions']);
</script>

<template>
  <div class="col col-12 mt-5">
    <div class="card bg-transparent border-0 d-flex flex-column p-4">
      <h1 class="text-center mb-4 evolution-title">Evolutions</h1>
        <div class="evolution-container d-flex justify-content-center gap-5">
          <template v-for="(evolution, index) in evolutions" :key="evolution.id">
            <div
              class="evolution-card d-flex flex-column justify-content-center gap-2 align-items-center"
            >
              <img
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`"
                alt="Evolution"
                class="evolution-img w-50"
              >
              <p class="m-0">{{ evolution.name }}</p>
            </div>
    
            <img
              v-if="index < evolutions.length - 1"
              class="arrow-svg" src="@/assets/images/icons/arrow-right.svg"
              alt="Flecha para a direita"
            />
          </template>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .evolution-card {
    background-color: $pink-100;
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
  }

  .arrow-svg {
    width: 2rem;
  }

  @media(max-width: 1024px) {
    .evolution-card {
      width: 10rem;
      height: 10rem;
    }
  }

  @media(max-width: 720px) {
    .evolution-container {
      flex-direction: column;
      align-items: center !important;
    }
    
    .col {
      margin-top: 10rem !important;
    }

    .arrow-svg {
      rotate: 90deg;
    }
  }
</style>