<script setup>
  import { ref, defineProps, defineEmits } from 'vue';

  const props = defineProps({
    selectedFilter: { type: String, required: true },
  });
</script>

<template>
  <div class="col-12 mb-4">
    <div class="card rounded-4">
      <div class="w-100 h-100 p-4 pt-0 d-flex flex-column align-items-center">
        <div class="d-flex align-items-center justify-content-center ps-5">
          <h2 class="m-0">Encontre seu Pokémon</h2>
          <img src="@/assets/images/pokebola.gif" alt="Pokebola" class="pokebola">
        </div>

        <div class="form w-100 d-flex justify-content-between align-items-center gap-4">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Nome completo ou ID"
              aria-label="Text input with dropdown button"
            />
            <button class="btn">Pesquisar</button>
          </div>

          <select class="form-select" aria-label="Default select example">
            <option selected value="all">Tipo</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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