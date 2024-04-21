import { createStore } from "vuex";
import { getPokemons } from '@/axios';

const state = {
  loadingFlags: {
    allPokemons: false,
    morePokemons: false,
  },
  pokemons: [],
  pokemonsToShow: 20,
}

const mutations = {
  startLoadingFlag(state, flag) {
    state.loadingFlags[flag] = true;
  },

  stopLoadingFlag(state, flag) {
    state.loadingFlags[flag] = false;
  },

  setPokemons (state, pokemons) {
    state.pokemons = pokemons;
  },

  setMorePokemons (state, pokemons) {
    state.pokemons.push(...pokemons);
  }
}

const actions = {
  async getPokemons ({ commit, getters }) {
    commit('startLoadingFlag', 'allPokemons');

    const { offset, limit } = getters.getPokemonsPagination;

    try {
      const pokemons = await getPokemons(offset, limit);

      commit('setPokemons', pokemons);
    } catch(error) {
      console.log(error);
    } finally {
      commit('stopLoadingFlag', 'allPokemons');
    }
  },

  async getPokemonsOnScroll ({ commit, getters }) {
    commit('startLoadingFlag', 'morePokemons');

    await new Promise((res) => setTimeout(res, 1000));
    const { offset, limit } = getters.getPokemonsPagination;

    try {
      const pokemons = await getPokemons(offset, limit);

      commit('setMorePokemons', pokemons);
    } catch(error) {
      console.log(error);
    } finally {
      commit('stopLoadingFlag', 'morePokemons');
    }
  }
}

const getters = {
  getPokemonsPagination: state => ({ offset: state.pokemons.length, limit: state.pokemonsToShow }),
  getPokemons: state => state.pokemons,
}

export default createStore({
  state,
  getters,
  actions,
  mutations
})