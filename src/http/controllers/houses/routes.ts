import { Router } from "express";
import { registerHouse } from "./register-house";

export async function housesRoutes(app: Router) {
  app.post("/create-house/:userId", registerHouse);
}
