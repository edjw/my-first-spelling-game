import { getRandomWord } from "./getRandomWord";
import { scrambleWord } from "./scrambleWord";
import type { SelectedLetter } from "../types/selectedLetter";

export const startNewGame = (answerWords: string[]) => {
  const answerWord = getRandomWord(answerWords);
  const scrambledWord = scrambleWord(answerWord);

  const scrambledWordStatus: SelectedLetter[] = scrambledWord
    .split("")
    .map((letter, index) => ({
      letter,
      isSelected: false,
      letterIndex: index,
    }));

  return { answerWord, scrambledWord, scrambledWordStatus };
};

export const resetCurrentGame = (scrambledWord: string) => {
  const scrambledWordStatus: SelectedLetter[] = scrambledWord
    .split("")
    .map((letter, index) => ({
      letter,
      isSelected: false,
      letterIndex: index,
    }));

  return scrambledWordStatus;
};

export const toggleLetterSelected = (
  scrambledWordStatus: SelectedLetter[],
  letterIndex: number
) => {
  const letter = scrambledWordStatus.find(
    (letter) => letter.letterIndex === letterIndex
  );

  if (!letter) return scrambledWordStatus;
  letter.isSelected = !letter.isSelected;

  return [
    ...scrambledWordStatus.filter(
      (letter) => letter.letterIndex !== letterIndex
    ),
    letter,
  ];
};
