<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import "../app.postcss";
  // import type { LayoutData } from "./$types";

  // export let data: LayoutData;

  // check the orientation of the screen
  let isPortrait = false;
  let mediaQueryList: MediaQueryList | null = null;
  const handleOrientationChange = (event: MediaQueryListEvent) => {
    isPortrait = event.matches;
  };

  onMount(() => {
    if (typeof window !== "undefined") {
      mediaQueryList = window.matchMedia("(orientation: portrait)");

      isPortrait = mediaQueryList.matches;

      mediaQueryList.addEventListener("change", handleOrientationChange);
    }
  });

  onDestroy(() => {
    if (mediaQueryList) {
      mediaQueryList.removeEventListener("change", handleOrientationChange);
    }
  });
</script>

<main class="pt-8j">
  <!-- {#if isPortrait}
    <section class="flex justify-center items-center min-h-[100dvh]">
      <p>Switch to landscape</p>
    </section>
  {:else} -->
    <slot />
  <!-- {/if} -->
</main>
