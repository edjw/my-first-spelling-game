<script lang="ts">
  import { getRandomWord, scrambleWord } from "$lib/functions";
  import type { SelectedLetter } from "$lib/types/selectedLetter";
  /** @type {import('./$types').PageData} */
  export let data;

  const {
    answerWords,
  }: {
    answerWords: string[];
  } = data.props;

  let answerWord = getRandomWord(answerWords);
  let scrambledWord = scrambleWord(answerWord);

  let scrambledWordStatus: SelectedLetter[] = scrambledWord
    .split("")
    .map((letter, index) => ({
      letter,
      isSelected: false,
      letterIndex: index,
    }));

  $: scrambledWordStatus;

  $: currentAnswer = scrambledWordStatus
    .filter((letter) => letter.isSelected)
    .map((letter) => letter.letter)
    .join("");

  $: answerFound = currentAnswer === answerWord;

  const startNewGame = () => {
    answerWord = getRandomWord(answerWords);

    scrambledWord = scrambleWord(answerWord);

    scrambledWordStatus = scrambledWord.split("").map((letter, index) => ({
      letter,
      isSelected: false,
      letterIndex: index,
    }));
  };

  const resetCurrentGame = () => {
    scrambledWordStatus = scrambledWord.split("").map((letter, index) => ({
      letter,
      isSelected: false,
      letterIndex: index,
    }));
  };

  const toggleLetterSelected = (letterIndex: number) => {
    const letter = scrambledWordStatus.find(
      (letter) => letter.letterIndex === letterIndex
    );

    if (!letter) return;
    letter.isSelected = !letter.isSelected;

    scrambledWordStatus = [
      ...scrambledWordStatus.filter(
        (letter) => letter.letterIndex !== letterIndex
      ),
      letter,
    ];
  };
</script>

<div class="grid grid-rows-[auto_1fr] min-h-[100dvh]">
  <section class="flex flex-row items-center justify-center">
    <p class="flex flex-row items-center justify-center w-full text-2xl my-0">
      {answerWord}
    </p>
  </section>

  <div class="grid grid-rows-3">
    <!-- the answer section -->
    <section class="flex flex-row items-center justify-center gap-x-4">
      {#each scrambledWordStatus as { letter, isSelected, letterIndex } (letterIndex)}
        {#if isSelected}
          <button
            class="flex flex-row items-center justify-center outline outline-slate-400 rounded w-12 h-12 text-2xl"
            class:bg-green-400={answerFound}
            on:click={() => {
              toggleLetterSelected(letterIndex);
            }}
          >
            {letter}
          </button>
        {/if}
      {/each}
    </section>

    <!-- the scrambled word section -->
    <section class="flex flex-row items-center justify-center gap-x-4">
      {#each scrambledWordStatus as { letter, isSelected, letterIndex } (letterIndex)}
        {#if !isSelected}
          <button
            class="flex flex-row items-center justify-center outline rounded w-12 h-12 text-2xl"
            on:click={() => {
              toggleLetterSelected(letterIndex);
            }}
          >
            {letter}
          </button>
        {/if}
      {/each}
    </section>

    <section class="flex flex-col justify-center items-center gap-y-8">
      {#if currentAnswer.length === answerWord.length && !answerFound}
        <p class="my-0">Nope</p>
        <button
          class="outline rounded px-4 py-2"
          on:click={() => {
            resetCurrentGame();
          }}
        >
          Try Again
        </button>
      {/if}
      {#if answerFound}
        <p
          class="flex flex-row items-center justify-center w-full text-2xl my-0"
        >
          That's right!
        </p>
        <button
          class="outline rounded px-4 py-2"
          on:click={() => startNewGame()}>Try New Word</button
        >
      {/if}
    </section>
  </div>
</div>
