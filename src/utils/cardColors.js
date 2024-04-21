const pokemonTypes = {
  normal: '#5c5c5c',
  fire: '#FFA64C',
  water: '#63BBF2',
  electric: '#F2B84B',
  grass: '#48D0B0',
  ice: '#77d2f7',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#f2cd5a',
  flying: '#6892B0',
  psychic: '#f542bd',
  bug: '#76A866',
  rock: '#BCAC66',
  ghost: '#735797',
  dragon: '#7038f8',
  dark: '#333333',
  steel: '#b8b8d0',
  fairy: '#f469a9',
  default: '#8A8A8A'
}

export const getCardColors = (type) => {
  return pokemonTypes[type] || pokemonTypes.default;
}