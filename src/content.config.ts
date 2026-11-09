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

/*
	Cada persona del hall de fama es un archivo. La foto vive junto al
	markdown y el esquema la valida, para que el muro crezca sin que la
	página tenga que saber de antemano quantas personas hay.
*/
const hallOfFame = defineCollection({
	loader: glob({
		pattern: ["*.md", "!_*.md"],
		base: "./src/hall-of-fame",
		generateId: ({ entry }) => entry.replace(/\.md$/i, ""),
	}),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			photo: image(),
			note: z.string().optional(),
			roles: z.array(
				z.object({
					title: z.string(),
					from: z.string(),
					to: z.string(),
				}),
			),
			highlights: z.array(z.string()).default([]),
			order: z.number().default(0),
		}),
});

export const collections = { wiki, hallOfFame };
