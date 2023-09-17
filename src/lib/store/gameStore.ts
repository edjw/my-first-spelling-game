import type { SelectedLetter } from "$lib/types/selectedLetter";
import { writable } from "svelte/store";
export const answerWord = writable<string>("");
export const scrambledLetters = writable<SelectedLetter[]>([]);
export const answerFound = writable<boolean>(false);
export const selectedLetters = writable<any[]>([]);
