import express from "express";
import { usersRoutes } from "./http/controllers/users/routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(usersRoutes);

export { app };
