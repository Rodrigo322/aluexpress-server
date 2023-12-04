import cors from "cors";
import express from "express";
import path from "node:path";

import { housesRoutes } from "./modules/Houses/http/controllers/routes";
import { usersRoutes } from "./modules/Users/http/controllers/routes";
import { authRoutes } from "./modules/authentication/http/controllers/routes";

const app = express();

app.use(express.json());
app.use(cors());

usersRoutes(app);
housesRoutes(app);
authRoutes(app);

app.use("/images", express.static(path.join(__dirname, "..", "uploads")));

export { app };
