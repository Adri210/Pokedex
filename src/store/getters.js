export default {
  getPokemonsPagination: state => ({ offset: state.pokemons.length, limit: state.pokemonsToShow }),
  getPokemons: state => state.pokemons,
  getLoadingFlags: state => state.loadingFlags,
  getTypes: state => state.types,
  getActiveFilters: state => state.activeFilters,
}