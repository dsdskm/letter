import { checkTeamCount, initAccount, updateVideoPath } from "controller/kiaScriptController";
import express from "express";
export const kiaScriptRouter = express.Router();

kiaScriptRouter.post("/initAccount", initAccount);
kiaScriptRouter.post("/checkTeamCount", checkTeamCount);
kiaScriptRouter.post("/updateVideoPath", updateVideoPath);
