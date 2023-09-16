import type { PageLoad } from "./$types";
import { receptionWords } from "$lib/words/reception";

export const load = (async () => {
  return {
    props: {
      answerWords: receptionWords,
    },
  };
}) satisfies PageLoad;
