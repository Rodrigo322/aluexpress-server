import { Router } from "express";
import { registerHouse } from "./register-house";
import { GetHouse } from "./get-house";

export async function housesRoutes(app: Router) {
  app.post("/create-house/:userId", registerHouse);
  app.get("/get-unique-house/:houseId", GetHouse);
}
