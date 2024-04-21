import { getPokemons, getTypesAndPokemonsByType } from '@/axios';

export default {
  async loadPokemons({ commit, getters }, nameOrId = '') {
    commit('startLoadingFlag', 'allPokemons');
    commit('setPokemons', []);
    commit('resetFilters');
    if (nameOrId) commit('setActiveFilter', { filter: nameOrId, flag: 'nameOrId' });

    const { offset, limit } = getters.getPokemonsPagination;

    try {
      const pokemons = await getPokemons(offset, limit, nameOrId);

      commit('setPokemons', pokemons);
    } catch {
      console.log('Entrou no catch');
      commit('setPokemons', []);
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
    commit('resetFilters');
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