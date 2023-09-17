<script lang="ts">
  import {
    startNewGame,
    resetCurrentGame,
    toggleLetterSelected,
  } from "$lib/functions/gameUtils";
  import Train from "$lib/components/Train.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  const {
    answerWords,
  }: {
    answerWords: string[];
  } = data.props;

  import {
    answerWord,
    answerFound,
    selectedLetters,
    scrambledLetters,
    trainX,
  } from "$lib/store/gameStore";

  let scrambledWord: string;

  const startAnotherGame = () => {
    trainX.set(3000, {
      duration: 0,
    });
    const result = startNewGame(answerWords);
    answerWord.set(result.answerWord);
    scrambledWord = result.scrambledWord;
    scrambledLetters.set(result.scrambledWordStatus);
    selectedLetters.set([]);
    answerFound.set(false);

    setTimeout(() => {
      trainX.set(0, {
        duration: 2500,
      });
    }, 100);
  };

  const resetThisGame = () => {
    resetCurrentGame(scrambledWord);
    scrambledLetters.set(
      scrambledWord.split("").map((letter, index) => ({
        letter,
        isSelected: false,
        letterIndex: index,
      }))
    );
    selectedLetters.set([]);
    answerFound.set(false);
  };

  const toggleLetter = (letterIndex: number) => {
    const letter = $scrambledLetters.find(
      (letter) => letter.letterIndex === letterIndex
    );

    if (!letter) return;

    $selectedLetters = [
      ...$selectedLetters,
      {
        letter: letter.letter,
        letterIndex: letter.letterIndex,
        isSelected: true,
      },
    ];

    scrambledLetters.update((scrambledLetters) =>
      toggleLetterSelected(scrambledLetters, letterIndex)
    );
  };

  startAnotherGame(); // Initialize game on page load

  $: currentAnswer = $selectedLetters
    .filter((letter) => letter.isSelected)
    .map((letter) => letter.letter)
    .join("");

  $: if (currentAnswer !== "" && currentAnswer === $answerWord)
    answerFound.set(true);
</script>

<div class="grid grid-rows-[1fr]">
  <section class="flex flex-row items-center justify-center pt-8">
    <p class="text-4xl my-0 select-none">
      {$answerWord}
    </p>
  </section>

  <div>
    <!-- the answer section -->
    <section>
      <Train carriages={$answerWord.length} />
    </section>

    <!-- the scrambled word section -->
    {#if currentAnswer.length < $answerWord.length}
      <section class="flex flex-row items-center justify-center gap-x-4 pt-8">
        {#each $scrambledLetters as { letter, isSelected, letterIndex } (letterIndex)}
          {#if !isSelected}
            <button
              class="flex flex-row items-center justify-center outline rounded w-12 h-12 text-3xl select-none"
              on:click={() => toggleLetter(letterIndex)}
            >
              {letter}
            </button>
          {/if}
        {/each}
      </section>
    {/if}

    <section class="flex flex-col justify-center items-center gap-y-8">
      {#if currentAnswer.length === $answerWord.length && !$answerFound}
        <p
          class="flex flex-row items-center justify-center w-full text-2xl my-0"
        >
          Nearly! Try again.
        </p>
        <button
          class="outline rounded px-4 py-2 select-none"
          on:click={resetThisGame}
        >
          Try Again
        </button>
      {/if}
      {#if $answerFound}
        <p
          class="flex flex-row items-center justify-center w-full text-2xl my-0"
        >
          That's right!
        </p>
        <button
          class="outline rounded px-4 py-2 select-none"
          on:click={startAnotherGame}>Try New Word</button
        >
      {/if}
    </section>
  </div>
</div>
