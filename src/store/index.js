import { createStore } from "vuex";
import { getPokemons, getTypesAndPokemonsByType } from '@/axios';

const state = {
  loadingFlags: {
    allPokemons: false,
    morePokemons: false,
  },
  pokemons: [],
  pokemonsToShow: 20,
  types: [],
  activeFilters: {
    type: '',
    nameOrId: '',
  },
}

const mutations = {
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

const actions = {
  async loadPokemons({ commit, getters }) {
    commit('startLoadingFlag', 'allPokemons');
    commit('setPokemons', []);
    commit('resetFilters');

    const { offset, limit } = getters.getPokemonsPagination;

    try {
      const pokemons = await getPokemons(offset, limit);

      commit('setPokemons', pokemons);
    } catch (error) {
      console.log(error);
    } finally {
      commit('stopLoadingFlag', 'allPokemons');
    }
  },

  async loadPokemonsOnScroll({ commit, getters }) {
    if (
      !getters.getPokemons.length ||
      getters.getActiveFilters.type ||
      getters.getActiveFilters.nameOrId
    ) return;
    commit('startLoadingFlag', 'morePokemons');

    await new Promise((res) => setTimeout(res, 1000));
    const { offset, limit } = getters.getPokemonsPagination;

    try {
      const pokemons = await getPokemons(offset, limit);

      commit('setMorePokemons', pokemons);
    } catch (error) {
      console.log(error);
    } finally {
      commit('stopLoadingFlag', 'morePokemons');
    }
  },

  async loadTypes({ commit }) {
    try {
      const types = await getTypesAndPokemonsByType();

      commit('setTypes', types);
    } catch (error) {
      console.log(error);
    }
  },

  async filterPokemonByType({ commit }, type) {
    commit('startLoadingFlag', 'allPokemons');
    commit('setPokemons', []);
    commit('setActiveFilter', { filter: type, flag: 'type' });

    try {
      const pokemons = await getTypesAndPokemonsByType(type);

      commit('setPokemons', pokemons);
    } catch (error) {
      console.log(error);
    } finally {
      commit('stopLoadingFlag', 'allPokemons');
    }
  }
}

const getters = {
  getPokemonsPagination: state => ({ offset: state.pokemons.length, limit: state.pokemonsToShow }),
  getPokemons: state => state.pokemons,
  getLoadingFlags: state => state.loadingFlags,
  getTypes: state => state.types,
  getActiveFilters: state => state.activeFilters,
}

export default createStore({
  state,
  getters,
  actions,
  mutations
})