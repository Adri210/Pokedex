<script setup>
  import { defineProps, watchEffect, ref, computed } from 'vue';
  import PokemonNotFound from '@/assets/images/pokemon-not-found.png';
  import { useStore } from 'vuex';
  
  defineProps({
    cardColor: { type: String, default: '' },
  })

  const { getters } = useStore();

  const pokemon = computed(() => getters['getPokemon']);

  const pokemonSprites = ref([])

  watchEffect(() => {
    if (pokemon.value.sprites) {
      pokemonSprites.value = [
        {
          id: 1,
          title: 'Dream World',
          default: pokemon.value.sprites.other['dream_world'].front_default,
          shinny: pokemon.value.sprites.other['official-artwork'].front_default,
        },
        {
          id: 2,
          title: 'Home',
          default: pokemon.value.sprites.other['home'].front_default,
          shinny: pokemon.value.sprites.other['home'].front_shiny,
        },
        {
          id: 3,
          title: 'Generation 1',
          default: pokemon.value.sprites.versions['generation-i']['red-blue'].front_default,
          shinny: pokemon.value.sprites.versions['generation-i']['yellow'].front_default,
        },
        {
          id: 4,
          title: 'Generation 2',
          default: pokemon.value.sprites.versions['generation-ii']['gold'].front_default,
          shinny: pokemon.value.sprites.versions['generation-ii']['silver'].front_shiny,
        },
        {
          id: 5,
          title: 'Generation 3',
          default: pokemon.value.sprites.versions['generation-iii']['emerald'].front_default,
          shinny: pokemon.value.sprites.versions['generation-iii']['firered-leafgreen'].front_shiny,
        },
        {
          id: 6,
          title: 'Generation 4',
          default: pokemon.value.sprites.versions['generation-iv']['diamond-pearl'].front_default,
          shinny: pokemon.value.sprites.versions['generation-iv']['heartgold-soulsilver'].front_shiny,
        },
        {
          id: 7,
          title: 'Generation 5',
          default: pokemon.value.sprites.versions['generation-v']['black-white'].front_default,
          shinny: pokemon.value.sprites.versions['generation-v']['black-white'].front_shiny,
        },
        {
          id: 8,
          title: 'Generation 6',
          default: pokemon.value.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_default,
          shinny: pokemon.value.sprites.versions['generation-vi']['x-y'].front_shiny
        }
      ]
    }
  })
</script>

<template>
  <div class="col col-12  mt-5">
    <div
      class="d-flex align-items-center card bg-white p-4 rounded-4 gap-2 flex-grow-1 flex-column"
    >
      <h1>Sprites:</h1>
      
      <template v-if="pokemon.sprites">
        <div
          v-for="(sprite, index) in pokemonSprites"
          :key="sprite.id"
          class="pokemon-sprites mb-5"
        >
        <div
          class="sprite-title d-flex justify-content-center rounded-3 py-2"
          :style="[`backgroundColor: ${cardColor}`]"
        >
          <h2 class="m-0 text-white">{{ sprite.title }}</h2>
        </div>
          <div class="sprite-container d-flex align-items-center justify-content-center gap-4">
            <div>
              <img v-if="sprite.default" class="sprite" :src="sprite.default" />

              <div class="position-relative" v-else>
                <img class="sprite" :src="PokemonNotFound" alt="Not Found">
                <h2 class="m-0 position-absolute top-50 text-white not-found">Não encontrado</h2>
              </div>
            </div>
  
            <div>
              <img v-if="sprite.shinny" class="sprite" :src="sprite.shinny" />

              <div class="position-relative" v-else>
                <img :src="PokemonNotFound" class="sprite" alt="Not Found">
                <h2 class="m-0 position-absolute top-50 text-white not-found">Não encontrado</h2>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .not-found {
    left: 30%;
  }

  .sprite {
    width: 20rem;
  }

  @media(max-width: 720px) {
    .sprite-container {
      flex-direction: column;
    }

    .sprite {
      width: 15rem;
    }
  }
</style>