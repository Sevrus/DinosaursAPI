import fs from "node:fs";
import path from "node:path";
import type {Dinosaur} from "../types/dinosaurs";

const dataPath = path.join(__dirname, "..", "data", "dinosaurs.json");

function normalize(s: string) {
    return s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
}

export function getAllDinosaurs(): Dinosaur[] {
    const raw = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(raw) as Dinosaur[];
}

export function searchDinosaurs(query: {
    q?: string;
    letter?: string;
    diet?: string;
    period?: string;
    country?: string;
    limit?: number;
    offset?: number;
}) {
    let out = getAllDinosaurs();

    if (query.letter) {
        const L = normalize(query.letter).slice(0, 1);
        out = out.filter(d => normalize(d.name).startsWith(L));
    }

    if (query.diet) {
        const diet = normalize(query.diet);
        out = out.filter(d => normalize(d.diet.en).includes(diet) || normalize(d.diet.fr).includes(diet));
    }

    if (query.period) {
        const p = normalize(query.period);
        out = out.filter(d => normalize(d.period.en).includes(p) || normalize(d.period.fr).includes(p));
    }

    if (query.country) {
        const c = normalize(query.country);
        out = out.filter(d => normalize(d.discovered_in.en).includes(c) || normalize(d.discovered_in.fr).includes(c));
    }

    if (query.q) {
        const q = normalize(query.q);
        out = out.filter(d =>
            normalize(d.name).includes(q) ||
            normalize(d.description.en).includes(q) ||
            normalize(d.description.fr).includes(q) ||
            normalize(d.classification.family).includes(q) ||
            normalize(d.classification.genus).includes(q))
    }

    const offset = Math.max(0, query.offset ?? 0);
    const limit = Math.min(200, Math.max(1, query.limit ?? 50));

    return {
        total: out.length,
        offset,
        limit,
        results: out.slice(offset, offset + limit)
    }
}

export function getByName(name: string) {
    const all = getAllDinosaurs();
    const target = normalize(name);
    return all.find(d => normalize(d.name) === target) ?? null;
}
