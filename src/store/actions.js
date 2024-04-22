import {
  getPokemons,
  getTypesAndPokemonsByType,
  getPokemonById,
  getPokemonSpecies,
  getPokemonDetails
} from '@/axios';
import { extractEvolutionSpecies } from '@/utils/extractEvolutionSpecies.js';

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
  },

  async loadPokemonById({ commit }, id) {
    commit('startLoadingFlag', 'pokemonDetails');
    commit('setPokemon', {})

    try {
      const pokemon = await getPokemonById(id);

      commit('setPokemon', pokemon);
    } catch (error) {
      console.log(error);
    } finally {
      commit('stopLoadingFlag', 'pokemonDetails');
    }
  },

  async getPokemonEvolutions({ commit }, id) {
    commit('startLoadingFlag', 'pokemonEvolutions');

    try {
      const pokemonSpecies = await getPokemonSpecies(id);
      const evolutionChain = await getPokemonDetails(pokemonSpecies.evolution_chain.url);
      const extractedEvolutions = extractEvolutionSpecies(evolutionChain);

      commit('setEvolutions', extractedEvolutions);
    } catch (error) {
      console.log(error);
    } finally {
      commit('stopLoadingFlag', 'pokemonEvolutions');
    }
  }
}