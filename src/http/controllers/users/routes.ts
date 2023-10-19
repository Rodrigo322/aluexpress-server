import { Router } from "express";
import { register } from "./register";

export async function usersRoutes(app: Router) {
  app.post("/create-user", register);
}
