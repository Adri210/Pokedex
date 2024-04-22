<script setup>
  import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

  const { dispatch, getters } = useStore();
  const types = computed(() => getters['getTypes']);
  const nameOrIdFilter = ref('');
  const selectedType = ref('');

  const filterByType = async (type) => {
    if (type === '') {
      await dispatch('loadPokemons');
      return;
    }

    await dispatch('filterPokemonByType', type);
  };

  const filterByNameOrId = async () => {
    await dispatch('loadPokemons', nameOrIdFilter.value.toLowerCase());
    nameOrIdFilter.value = '';
    selectedType.value = '';
  }

  onMounted(async () => {
    await dispatch('loadTypes');
  });
</script>

<template>
  <div class="col-12 mb-4">
    <div class="card rounded-4">
      <div class="w-100 h-100 p-4 pt-0 d-flex flex-column align-items-center">
        <div class="d-flex align-items-center justify-content-center ps-5">
          <h2 class="m-0">Encontre seu Pokémon</h2>
          <img src="@/assets/images/gifs/pokebola.gif" alt="Pokebola" class="pokebola">
        </div>

        <div class="form w-100 d-flex justify-content-between align-items-center gap-4">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Nome completo ou ID"
              aria-label="Text input with dropdown button"
              v-model="nameOrIdFilter"
            />
            <button
              class="btn"
              @click="filterByNameOrId"
            >
              Pesquisar
            </button>
          </div>

          <select
            class="form-select"
            aria-label="Default select example"
            @change="filterByType(selectedType)"
            v-model="selectedType"
          >
            <option selected value="">Tipo</option>
            <option
              v-for="type in types"
              :key="type.name"
              :value="type.name"
            >
              {{ type.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    background-color: $pink-400;
    border-color: $pink-400;
  }

  .pokebola {
    width: 9rem;
  }

  option {
    text-transform: capitalize;
  }

  .btn {
    background-color: $green-400;
    color: white;

    &:hover, &:focus {
      background-color: $blue-400;
      color: white;
    }
  }

  .dropdown-item {
    &:hover {
      background-color: $pink-100;
    }
  }

  @media(max-width: 720px) {
    .input-group {
      width: 100% !important;
    }

    h2 {
      font-size: 1.2rem;
    }

    .pokebola {
      width: 5rem;
    }

    .form {
      flex-direction: column;
      
      input, select, .btn {
        font-size: 0.875rem;
      }
    }
  }
</style>