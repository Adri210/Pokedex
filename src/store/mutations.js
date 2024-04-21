export default {
  startLoadingFlag(state, flag) {
    state.loadingFlags[flag] = true;
  },

  stopLoadingFlag(state, flag) {
    state.loadingFlags[flag] = false;
  },

  setPokemons(state, pokemons) {
    state.pokemons = pokemons;
  },

  setMorePokemons(state, pokemons) {
    state.pokemons.push(...pokemons);
  },

  setTypes(state, types) {
    state.types = types;
  },

  setActiveFilter(state, { filter, flag }) {
    state.activeFilters[flag] = filter;
  },

  resetFilters(state) {
    state.activeFilters = {
      type: '',
      nameOrId: '',
    }
  }
}