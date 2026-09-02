import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const wiki = defineCollection({
	loader: glob({
		pattern: ["*.md", "!_*.md"],
		base: "./src/wiki",
		generateId: ({ entry }) => entry.replace(/\.md$/i, ""),
	}),
	schema: z.object({}).passthrough(),
});

export const collections = { wiki };
