const pokemons =  [
  {
    "name": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon/1/"
  },
  {
    "name": "ivysaur",
    "url": "https://pokeapi.co/api/v2/pokemon/2/"
  },
];

// for (let index = 0; index < pokemons.length; index += 1) {
//   console.log(pokemons[index].name);
// }

const teste = pokemons.map((pokemon) => {
  return pokemon.name;
})
console.log(teste);
// ['bulbasaur', 'ivysaur']






