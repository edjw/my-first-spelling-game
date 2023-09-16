export const getRandomWord = (wordsList: string[]): string => {
  const randomIndex = Math.floor(Math.random() * wordsList.length);
  const selectedWord = wordsList[randomIndex];
  return selectedWord;
};
