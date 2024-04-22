const extractSpecies = (chain) => {
  const result = [];

  const extract = (chain) => {
    const idMatch = chain.species.url.match(/\/(\d+)\/$/);
    const id = idMatch ? parseInt(idMatch[1]) : null;

    result.push({
      name: chain.species.name,
      id,
    });

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach(evolution => {
        extract(evolution);
      });
    }
  };

  extract(chain);

  return result;
};

export const extractEvolutionSpecies = (evolutionChain) => {
  let sortedSpecies = [];
  
  if (evolutionChain) {
    sortedSpecies = extractSpecies(evolutionChain.chain).sort((a, b) => a.id - b.id);
  }

  return sortedSpecies;
}