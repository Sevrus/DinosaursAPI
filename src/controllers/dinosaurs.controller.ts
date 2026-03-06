import { Request, Response } from "express";
import { getByName, searchDinosaurs } from "../services/dinosaurs.service";

export function listDinosaurs(req: Request, res: Response) {
    const { q, letter, diet, period, country, limit, offset } = req.query;

    const data = searchDinosaurs({
        q: typeof q === 'string' ? q : undefined,
        letter: typeof letter === 'string' ? letter : undefined,
        diet: typeof diet === 'string' ? diet : undefined,
        period: typeof period === 'string' ? period : undefined,
        country: typeof country === 'string' ? country : undefined,
        limit: typeof limit === "string" ? Number(limit) : undefined,
        offset: typeof offset === "string" ? Number(offset) : undefined
    });

    res.json(data);
}

export function getDinosaur(req: Request, res: Response) {
    const name = String(req.params.name);

    const dino = getByName(name);
    if (!dino) return res.status(404).json({ error: "Dinosaur not found" });
    res.json(dino);
}
