import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { getServerAppVersion } from "@api/api";
import { scriptRouter } from "@router/scriptRouter";
import { kiaScriptRouter } from "@router/kiaScriptRouter";
const cors = require("cors");

const app: Express = express();
app.use(cors());
const port = 5001;
app.use(bodyParser.json());
app.get("/", async (req: Request, res: Response) => {
  const version = await getServerAppVersion();
  res.send(version);
});

app.listen(port, () => {
  console.log(`Server is running`);
});

app.use("/script", scriptRouter);
app.use("/kia/script", kiaScriptRouter);
