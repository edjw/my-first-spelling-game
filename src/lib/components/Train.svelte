<script lang="ts">
  import {
    answerFound,
    selectedLetters,
    scrambledLetters,
  } from "$lib/store/gameStore";

  export let carriages = 1;
  const carriageWidth = 150;
  const gap = 15;
  const baseWidth = 500;
  const viewBoxWidth = 800;

  $: totalWidth = baseWidth + carriages * (carriageWidth + gap); // Total width of train and carriages
  $: scaleFactor = totalWidth > viewBoxWidth ? viewBoxWidth / totalWidth : 1;

  const trainStartX = 50;

  $: carriagePositions = Array.from(
    { length: carriages },
    (_, i) => trainStartX + baseWidth + i * (carriageWidth + gap)
  );

  $: viewBox = `0 0 ${viewBoxWidth} 300`;

  const deselectLetter = (letterIndex: number) => {
    const letter = $selectedLetters.find(
      (letter) => letter.letterIndex === letterIndex
    );
    if (!letter) return;
    $selectedLetters = $selectedLetters.filter(
      (letter) => letter.letterIndex !== letterIndex
    );
    $scrambledLetters = $scrambledLetters.map((letter) => {
      if (letter.letterIndex === letterIndex) {
        return {
          ...letter,
          isSelected: false,
        };
      }
      return letter;
    });
  };
</script>

<div
  class="max-w-full relative w-full before:content-[''] before:block before:pt-[30%]"
>
  <svg
    class="absolute top-0 left-10 w-full h-auto"
    {viewBox}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform={`scale(${scaleFactor})`}>
      <!-- Train Parts -->
      <ellipse cx={trainStartX + 150} cy="170" rx="10" ry="10" fill="gold" />
      <rect
        x={trainStartX + 90}
        y="170"
        width="120"
        height="60"
        fill="#FF6347"
      />
      <rect
        x={trainStartX + 210}
        y="100"
        width="50"
        height="130"
        fill="#FF6347"
      />
      <rect
        x={trainStartX + 95}
        y="130"
        width="20"
        height="40"
        fill="#8B4513"
      />

      <!-- Train Window -->
      <rect
        x={trainStartX + 220}
        y="110"
        width="30"
        height="40"
        fill="#37474F"
        rx="5"
        ry="5"
      />
      <rect
        x={trainStartX + 225}
        y="115"
        width="20"
        height="30"
        fill="lightblue"
        rx="5"
        ry="5"
      />

      <!-- Smoke Animation -->
      {#each [[130, 105, 20, 14, 0.8], [150, 95, 25, 16, 0.7], [175, 85, 28, 18, 0.6]] as [cx, cy, rx, ry, opacity]}
        <ellipse cx={trainStartX + cx} {cy} {rx} {ry} fill="grey" {opacity}>
          <animate
            attributeName="cy"
            from={cy}
            to={cy - 50}
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cx"
            from={cx}
            to={cx + 50}
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from={opacity}
            to={opacity - 0.6}
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
      {/each}

      <!-- Train Wheels -->
      {#each [110, 175, 240] as cx}
        <circle cx={trainStartX + cx} cy="230" r="20" fill="black" />
      {/each}

      {#each carriagePositions as position, index (index)}
        <!-- Letter Display -->
        {#if $selectedLetters[index]}
          <foreignObject x={position - 175} y="105" width="150" height="100">
            <button
              class="border-4 border-orange-600 bg-orange-800 rounded w-16 h-16 text-4xl cursor-pointer text-white hover:border-orange-400 select-none"
              on:click={() =>
                deselectLetter($selectedLetters[index].letterIndex)}
              tabindex="0"
              disabled={$answerFound}
            >
              {$selectedLetters[index].letter}
            </button>
          </foreignObject>
        {/if}

        <!-- Carriage Body -->
        <rect
          x={position - 220}
          y="170"
          width="150"
          height="60"
          fill="#A52A2A"
        />

        <!-- Carriage Lines -->
        {#each [[170], [230]] as [y]}
          <line
            x1={position - 220}
            y1={y}
            x2={position - 70}
            y2={y}
            stroke="#000"
            stroke-width="2"
          />
        {/each}

        <!-- Carriage Wheels -->
        {#each [-195, -95] as offset}
          <circle cx={position + offset} cy="230" r="20" fill="black" />
        {/each}
      {/each}
    </g>
  </svg>
</div>
