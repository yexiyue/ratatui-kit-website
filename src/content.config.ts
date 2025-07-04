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

export const collections = { principle };
