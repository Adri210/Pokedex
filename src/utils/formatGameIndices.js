export const formatGameIndices = (gameIndices) => {
  const groupedIndices = {};

  gameIndices.forEach(item => {
    if (!groupedIndices[item.game_index]) {
      groupedIndices[item.game_index] = [];
    }
    groupedIndices[item.game_index].push(item.version.name);
  });

  const sortedIndices = Object.keys(groupedIndices).sort((a, b) => a - b);

  const result = sortedIndices.map(index => {
    const versions = groupedIndices[index].join(', ');
    return `${index}: (${versions})`;
  });

  return result;
}