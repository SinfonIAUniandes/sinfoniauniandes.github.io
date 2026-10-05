import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

const GITHUB_WIKI = /^https?:\/\/github\.com\/[^/]+\/[^/]+\/wiki\/([^?#]*)/i;

const wikiImageModules = import.meta.glob<{ default: ImageMetadata }>(
	"../assets/wiki/*.{jpg,jpeg,png,webp,gif}",
	{ eager: true },
);

const wikiImagesByName = new Map(
	Object.entries(wikiImageModules).map(([path, mod]) => [
		path.split("/").pop() ?? path,
		mod.default,
	]),
);

const PAGE_ALIASES: Record<string, string> = {
	Home: "",
	"🎮-Remote-Controller": "Remote-Controller",
	"Documentación-del-Robot": "Documentación-Robot",
	Perception: "Vision",
};

export interface WikiNavItem {
	label: string;
	href: string;
	id: string;
}

export interface WikiNavSection {
	title?: string;
	items: WikiNavItem[];
}

function siteBase(baseUrl: string): string {
	return baseUrl.replace(/\/+$/, "");
}

function splitHash(value: string): { path: string; hash: string } {
	const hashIndex = value.indexOf("#");
	if (hashIndex === -1) {
		return { path: value, hash: "" };
	}
	return { path: value.slice(0, hashIndex), hash: value.slice(hashIndex) };
}

function normalizePageId(page: string): string {
	return decodeURIComponent(page)
		.replace(/\.md$/i, "")
		.replace(/\/+$/, "")
		.trim();
}

export function wikiPageHref(page: string, baseUrl: string, hash = ""): string {
	const aliased = PAGE_ALIASES[normalizePageId(page)];
	const id = aliased === undefined ? normalizePageId(page) : aliased;
	const root = `${siteBase(baseUrl)}/wiki`;
	return id ? `${root}/${id}${hash}` : `${root}${hash}`;
}

export function rewriteWikiHref(href: string, baseUrl: string): string {
	const trimmed = href.trim();
	if (
		trimmed === "" ||
		trimmed.startsWith("#") ||
		trimmed.startsWith("mailto:") ||
		trimmed.startsWith("tel:") ||
		trimmed.startsWith("data:")
	) {
		return trimmed;
	}

	const githubWiki = trimmed.match(GITHUB_WIKI);
	if (githubWiki) {
		const { path, hash } = splitHash(decodeURIComponent(githubWiki[1]));
		return wikiPageHref(path, baseUrl, hash);
	}

	const isExternal = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
	const isSiteAbsolute = trimmed.startsWith("/");
	if (isExternal || isSiteAbsolute) {
		return trimmed;
	}

	const { path, hash } = splitHash(trimmed.split("?")[0]);
	const page = path.replace(/^\.\//, "").replace(/^\.\.\//, "");
	if (!page || page.includes("/")) {
		return trimmed;
	}

	return wikiPageHref(page, baseUrl, hash);
}

export function rewriteWikiHtml(html: string, baseUrl: string): string {
	return html.replace(
		/\bhref=(["'])([^"']+)\1/gi,
		(full, quote: string, href: string) => {
			const next = rewriteWikiHref(href, baseUrl);
			return next === href ? full : `href=${quote}${next}${quote}`;
		},
	);
}

function wikiImageName(src: string): string | undefined {
	const name = src.split("?")[0].split("/").pop();
	if (name && wikiImagesByName.has(name)) {
		return name;
	}
	return undefined;
}

function attr(tag: string, name: string): string | undefined {
	return tag.match(new RegExp(`\\b${name}=(["'])([^"']*)\\1`, "i"))?.[2];
}

export async function optimizeWikiImages(html: string): Promise<string> {
	const tags = [...html.matchAll(/<img\b[^>]*>/gi)];
	let out = html;

	for (const match of tags) {
		const tag = match[0];
		const src = attr(tag, "src");
		if (!src) {
			continue;
		}

		const name = wikiImageName(src);
		const meta = name ? wikiImagesByName.get(name) : undefined;
		if (!meta) {
			continue;
		}

		const displayWidth = Number(attr(tag, "width") ?? 250);
		const optimized = await getImage({
			src: meta,
			width: displayWidth * 2,
			format: "webp",
		});
		const intrinsicWidth = Number(optimized.attributes.width ?? displayWidth * 2);
		const intrinsicHeight = Number(
			optimized.attributes.height ?? displayWidth * 2,
		);
		const displayHeight = Math.max(
			1,
			Math.round((intrinsicHeight / intrinsicWidth) * displayWidth),
		);
		const alt = attr(tag, "alt") ?? "";

		out = out.replace(
			tag,
			`<img src="${optimized.src}" width="${displayWidth}" height="${displayHeight}" alt="${alt}" loading="lazy" decoding="async">`,
		);
	}

	return out;
}

export function wrapWikiTables(html: string): string {
	// Las tablas largas se envuelven en un contenedor con desplazamiento
	// horizontal para que nunca ensanchen la página.
	return html.replace(/(<table\b[\s\S]*?<\/table>)/gi, '<div class="wiki-table-wrap">$1</div>');
}

export async function renderWikiHtml(html: string, baseUrl: string): Promise<string> {
	return wrapWikiTables(
		await optimizeWikiImages(rewriteWikiHtml(html, baseUrl)),
	);
}

export function wikiPageTitle(id: string, body = ""): string {
	const heading = body.match(/^#\s+(.+)$/m);
	if (heading) {
		return heading[1].replace(/\*\*/g, "").trim();
	}
	return id.replace(/-/g, " ");
}

export function parseWikiSidebar(markdown: string, baseUrl: string): WikiNavSection[] {
	const sections: WikiNavSection[] = [];
	let current: WikiNavSection = { items: [] };

	const flush = () => {
		if (current.title || current.items.length > 0) {
			sections.push(current);
		}
	};

	for (const line of markdown.split("\n")) {
		const link = line.match(/^#+\s+(?:[^\[]*)\[([^\]]+)\]\(([^)]+)\)/);
		if (link) {
			const href = rewriteWikiHref(link[2], baseUrl);
			const page = normalizePageId(link[2].replace(/^\.\//, ""));
			current.items.push({
				label: link[1].replace(/\*\*/g, "").trim(),
				href,
				id: PAGE_ALIASES[page] === "" ? "Home" : (PAGE_ALIASES[page] ?? page),
			});
			continue;
		}

		const heading = line.match(/^#+\s+(.+?)\s*$/);
		if (heading) {
			flush();
			current = {
				title: heading[1].replace(/\*\*/g, "").trim(),
				items: [],
			};
		}
	}

	flush();
	return sections;
}
