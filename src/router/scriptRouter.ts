import { checkDb, dbGenerator, renameController } from "controller/scriptController";
import express from "express";
export const scriptRouter = express.Router();

scriptRouter.post("/rename", renameController);
scriptRouter.post("/dbGenerator", dbGenerator);
scriptRouter.post("/checkDb", checkDb);