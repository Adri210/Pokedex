<script setup>
  import { onMounted, ref, defineProps } from 'vue'
  import { getPokemonDetails } from '@/axios';
  import { getCardColors } from '@/utils/cardColors.js';
  import { getBadgeType } from '@/utils/badgeTypes.js';
  import { RouterLink } from 'vue-router';

  const props = defineProps({
    url: { type: String, required: true },
  })

  const cardColor = ref('');
  const pokemon = ref({});
  const badges = ref([]);
  
  onMounted(async () => {
    pokemon.value = await getPokemonDetails(props.url);
    cardColor.value = getCardColors(pokemon.value.types[0].type.name);
    badges.value = pokemon.value.types.map((type) => {
      return getBadgeType(type.type.name);
    })
  });
</script>

<template>
  <div class="col col-12 col-xl-3 col-lg-6">
    <RouterLink :to="`/${pokemon.id}`"
      class="card rounded-4"
      :style="[
        `border-color: ${cardColor}`,
        `backgroundColor: ${cardColor}`
      ]"
    >
      <div
        class="h-100 d-flex flex-column align-items-center justify-content-end p-4"
      >
      <img
      class="pokemon-sprite align-self-center mb-3"
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
      :alt="`Pókemon ${pokemon.name}`"
        >
        <div class="d-flex gap-4 mb-3">
          <img
            v-for="badge in badges"
            :key="badge"
            :src="badge"
            alt="badge"
          />
        </div>
        <h2 class="m-0">
          {{ pokemon.name }}
        </h2>
        <span>#{{ pokemon.id }}</span>
      </div>                                                                                                          
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.col {
  height: 22rem;
}

.card {
  height: 93%;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 32px 64px;

  .pokemon-sprite {
    height: 10rem;
    max-width: 20rem;
    bottom: 35%;   
    position: absolute;
    transition: bottom 0.3s ease-in-out;
  }

  &:hover {
    .pokemon-sprite {
      bottom: 45%;
    }
  }
}
 
h2 {
  font-weight: 700;
  text-transform: capitalize;

  span {
    font-weight: 400;
  }
}

a {
  text-decoration: none;
}
</style>