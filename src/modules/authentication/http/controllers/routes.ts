import { Router } from "express";
import { auth } from "./auth";

export async function authRoutes(app: Router) {
  app.post("/sing-in", auth);
}
