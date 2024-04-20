import axios from "axios";

export const pokeapi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
});

export const getPokemons = async (pokemonsToSkip, pokemonsToShow) => {
  const response = await pokeapi.get(`/pokemon?offset=${pokemonsToSkip}&limit=${pokemonsToShow}`);

  return response.data.results;
}

export const getPokemonDetails = async (url) => {
  const response = await pokeapi.get(url);

  return response.data;
}
