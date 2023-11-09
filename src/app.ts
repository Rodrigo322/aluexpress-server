import express from "express";
import cors from "cors";

import { usersRoutes } from "./modules/Users/http/controllers/routes";
import { housesRoutes } from "./modules/Houses/controllers/routes";

const app = express();

app.use(express.json());
app.use(cors());

usersRoutes(app);
housesRoutes(app);

export { app };
