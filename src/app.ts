import express from "express";
import cors from "cors";

import { usersRoutes } from "./http/controllers/users/routes";
import { housesRoutes } from "./http/controllers/houses/routes";

const app = express();

app.use(express.json());
app.use(cors());

usersRoutes(app);
housesRoutes(app);

export { app };
