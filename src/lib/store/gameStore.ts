import { writable } from "svelte/store";
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";
import type { Tweened } from "svelte/motion";
import type { SelectedLetter } from "$lib/types/selectedLetter";
export const answerWord = writable<string>("");
export const scrambledLetters = writable<SelectedLetter[]>([]);
export const answerFound = writable<boolean>(false);
export const selectedLetters = writable<any[]>([]);
export const trainX: Tweened<number> = tweened(2000, {
  duration: 5000,
});
