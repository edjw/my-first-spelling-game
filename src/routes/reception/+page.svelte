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
  } from "$lib/store/gameStore";

  let scrambledWord: string;

  const startAnotherGame = () => {
    const result = startNewGame(answerWords);
    answerWord.set(result.answerWord);
    scrambledWord = result.scrambledWord;
    scrambledLetters.set(result.scrambledWordStatus);
    selectedLetters.set([]);
    answerFound.set(false);
  };

  const resetThisGame = () => {
    selectedLetters.set(resetCurrentGame(scrambledWord));
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

    console.log(letter);

    console.log($selectedLetters);
    console.log($scrambledLetters);
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
  <section class="flex flex-row items-center justify-center">
    <p class="text-4xl my-0">
      {$answerWord}
    </p>
  </section>

  <div class="relative">
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
              class="flex flex-row items-center justify-center outline rounded w-12 h-12 text-3xl"
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
        <button class="outline rounded px-4 py-2" on:click={resetThisGame}>
          Try Again
        </button>
      {/if}
      {#if $answerFound}
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
