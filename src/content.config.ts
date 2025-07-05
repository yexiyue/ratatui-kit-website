import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const principle = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/principle",
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
  }),
});

const example = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/example",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      index: z.number(),
      image: image(),
    }),
});

export const collections = { principle, example };
