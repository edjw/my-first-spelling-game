<script lang="ts">
  import {
    startNewGame,
    resetCurrentGame,
    toggleLetterSelected,
  } from "$lib/functions/gameUtils";

  import type { SelectedLetter } from "$lib/types/selectedLetter";
  /** @type {import('./$types').PageData} */
  export let data;

  const {
    answerWords,
  }: {
    answerWords: string[];
  } = data.props;

  let answerWord: string;
  let scrambledWord: string;
  let scrambledWordStatus: SelectedLetter[];

  const startAnotherGame = () => {
    const result = startNewGame(answerWords);
    answerWord = result.answerWord;
    scrambledWord = result.scrambledWord;
    scrambledWordStatus = result.scrambledWordStatus;
  };

  const resetThisGame = () => {
    scrambledWordStatus = resetCurrentGame(scrambledWord);
  };

  const toggleLetter = (letterIndex: number) => {
    scrambledWordStatus = toggleLetterSelected(
      scrambledWordStatus,
      letterIndex
    );
  };

  startAnotherGame(); // Initialize game on page load

  $: currentAnswer = scrambledWordStatus
    .filter((letter) => letter.isSelected)
    .map((letter) => letter.letter)
    .join("");

  $: answerFound = currentAnswer === answerWord;
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
            on:click={() => toggleLetter(letterIndex)}
          >
            {letter}
          </button>
        {/if}
      {/each}
    </section>

    <!-- the scrambled word section -->
    {#if currentAnswer.length < answerWord.length}
      <section class="flex flex-row items-center justify-center gap-x-4">
        {#each scrambledWordStatus as { letter, isSelected, letterIndex } (letterIndex)}
          {#if !isSelected}
            <button
              class="flex flex-row items-center justify-center outline rounded w-12 h-12 text-2xl"
              on:click={() => toggleLetter(letterIndex)}
            >
              {letter}
            </button>
          {/if}
        {/each}
      </section>
    {/if}

    <section class="flex flex-col justify-center items-center gap-y-8">
      {#if currentAnswer.length === answerWord.length && !answerFound}
        <p
          class="flex flex-row items-center justify-center w-full text-2xl my-0"
        >
          Nearly! Try again.
        </p>
        <button class="outline rounded px-4 py-2" on:click={resetThisGame}>
          Try Again
        </button>
      {/if}
      {#if answerFound}
        <p
          class="flex flex-row items-center justify-center w-full text-2xl my-0"
        >
          That's right!
        </p>
        <button class="outline rounded px-4 py-2" on:click={startAnotherGame}
          >Try New Word</button
        >
      {/if}
    </section>
  </div>
</div>
