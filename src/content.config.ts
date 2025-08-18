import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { entries } from "../dragon.json";

const principle = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: entries.principle.entryBase,
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
  }),
});

const example = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: entries.example.entryBase,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      index: z.number(),
      image: image(),
    }),
});

const docs = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: entries.docs.entryBase,
  }),
  schema: z.object({
    title: z.string(),
    index: z.number(),
  }),
});

export const collections = { principle, example, docs };
