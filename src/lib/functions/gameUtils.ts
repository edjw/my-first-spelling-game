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
): SelectedLetter[] => {
  const updatedStatus = [...scrambledWordStatus];

  const indexToUpdate = updatedStatus.findIndex(
    (letter) => letter.letterIndex === letterIndex
  );

  if (indexToUpdate === -1) return scrambledWordStatus;

  const letterToUpdate = { ...updatedStatus[indexToUpdate] };
  letterToUpdate.isSelected = !letterToUpdate.isSelected;

  updatedStatus[indexToUpdate] = letterToUpdate;

  return updatedStatus;
};
