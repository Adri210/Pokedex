import axios from "axios";

export const pokeapi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
});

export const getPokemons = async (pokemonsToSkip, pokemonsToShow, nameOrId = '') => {

  if (!nameOrId) {
    const response = await pokeapi.get(`/pokemon?offset=${pokemonsToSkip}&limit=${pokemonsToShow}`);

    return response.data.results;
  }

  const response = await pokeapi.get(`/pokemon/${nameOrId}`);

  return [
    {
      name: response.data.name,
      url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}/`
    }
  ]
}

export const getPokemonDetails = async (url) => {
  const response = await pokeapi.get(url);

  return response.data;
}

export const getTypesAndPokemonsByType = async (name = '') => {
  const response = await pokeapi.get(`/type/${name}`);

  if (name === '') return response.data.results;

  return response.data.pokemon.map((pokemon) => pokemon.pokemon);
}

export const getPokemonById = async (id) => {
  const response = await pokeapi.get(`/pokemon/${id}`);

  return response.data;
}

export const getPokemonSpecies = async (id) => {
  const response = await pokeapi.get(`/pokemon-species/${id}`);

  return response.data;
}