import { Router } from "express";
import { getDinosaur, listDinosaurs } from "../controllers/dinosaurs.controller";

export const dinosaursRouter = Router();

dinosaursRouter.get("/", listDinosaurs);
dinosaursRouter.get("/:name", getDinosaur);
