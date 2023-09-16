export const scrambleWord = (word: string): string => {
  if (word.length === 1) return word;
  if (word.length === 2) return word[1] + word[0];

  const wordArray = word.split("");
  let scrambledWord = "";

  while (wordArray.length) {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    scrambledWord += wordArray.splice(randomIndex, 1)[0];
  }

  return scrambledWord === word ? scrambleWord(word) : scrambledWord;
};
