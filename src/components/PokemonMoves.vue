<script setup>
  import { defineProps } from 'vue';

  defineProps({
    moves: { type: Array, default: () => [] },
    cardColor: { type: String, default: '' },
  })
</script>

<template>
  <div class="col col-12  mt-5">
    <div
      class="d-flex align-items-center card bg-white p-4 rounded-4 gap-2 flex-grow-1 flex-column"
    >
      <h2>Moves:</h2>
      
      <div class="d-flex justify-content-center gap-2 flex-wrap">
        <div
          v-for="move in moves"
          :key="move.move.name"
          class="ability py-1 px-2 rounded-3"
          :style="[`backgroundColor: ${cardColor}`]"
        >
          <span>{{ move.move.name }}</span>
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