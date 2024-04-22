<script setup>
  import { useStore } from 'vuex';
  import { defineProps } from 'vue';

  const { getters } = useStore();
  defineProps({
    cardColor: { type: String, default: '' },
    badges: { type: Array, default: () => ([]) },
    gameIndices: { type: Array, default: () => ([]) },
    pokemon: { type: Object, default: () => ({}) },
  })
</script>

<template>
  <div class="col col-12 col-xl-6 h-75">
      <div class="card bg-white rounded-4 p-4 d-flex flex-column gap-2">
        <div class="d-flex align-items-center gap-2">
          <h4>- Name:</h4>
          <h3>{{ pokemon.name }}</h3>
        </div>

        <div class="d-flex align-items-center gap-2">
          <h4>- Types:</h4>
          <div class="d-flex gap-2 align-items-center">
            <img
              v-for="badge in badges"
              :key="badge"
              :src="badge"
              alt="badge"
            />
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <h4>- Height:</h4>
          <h3>{{ pokemon.height }}</h3>
        </div>

        <div class="d-flex align-items-center gap-2">
          <h4>- Weight:</h4>
          <h3>{{ pokemon.weight }}</h3>
        </div>

        <div class="d-flex flex-column align-items-center gap-2 mt-4">
          <h3>Abilities:</h3>
          
          <div class="d-flex align-items-center gap-2">
            <div
              v-for="ability in pokemon.abilities"
              :key="ability.ability.name"
              class="ability py-1 px-2 rounded-3"
              :style="[`backgroundColor: ${cardColor}`]"
            >
              <span>{{ ability.ability.name }}</span>
            </div>
          </div>
        </div>

        <div class="d-flex flex-grow-1 flex-column gap-2 mt-4">
          <h2>Game Indices:</h2>
          
          <div class="d-flex flex-column gap-2">
            <p
              v-for="indice in gameIndices"
              :key="indice"
            >
              <span>{{ indice }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .ability {
    text-transform: capitalize;
    color: #fff;
  }
</style>