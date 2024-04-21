<script setup>
  import { ref, defineProps, defineEmits } from 'vue';

  const props = defineProps({
    selectedFilter: { type: String, required: true },
  });

  const emit = defineEmits(['select-filter']);

  const filterOptions = ref(['Nome', 'Id', 'Tipo', 'Espécie']);
</script>

<template>
  <div class="col-12 pe-4 ps-0">
    <div class="card ps-0 mb-4 rounded-4">
      <div class="w-100 h-100 p-4 pt-0 d-flex flex-column align-items-center">
        <div class="d-flex align-items-center justify-content-center ps-5">
          <h2 class="m-0">Filtre seu Pokémon</h2>
          <img src="@/assets/images/pokebola.gif" alt="Pokebola" class="pokebola">
        </div>
        <div class="input-group w-50">
          <button
            class="btn btn-outline-secondary dropdown-toggle fw-medium"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ selectedFilter }}
          </button>

          <ul class="dropdown-menu">
            <li
              v-for="filter in filterOptions"
              :key="filter"
              @click="emit('select-filter', filter)"
            >
              <a class="dropdown-item" href="#">
                {{ filter }}
              </a>
            </li>
          </ul>

          <input
            type="text"
            class="form-control"
            aria-label="Text input with dropdown button"
          />
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

  .btn {
    background-color: $green-400;
    color: white;

    &:hover, &:focus {
      background-color: $blue-400;
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
  }
</style>