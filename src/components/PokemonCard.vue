<template>
  <div class="col col-lg-4 col-md-6 col-sm-12">
    teste
    <!-- <div class="card">
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI//sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
        :alt="`Pókemon ${pokemon.name}`"
      >
      <p>{{ pokemon.name }}</p>
    </div> -->
  </div>
</template>


<script setup>
  const props = defineProps({
    url: { type: String, required: true },
  })
  console.log(props.url);
</script>

<style lang="scss" scoped>
.col {
  height: 10rem; 
}

.card {
  background-color: $pink-700;
  height: 85%;

  img {
    width: 3rem;
  }
}
</style>