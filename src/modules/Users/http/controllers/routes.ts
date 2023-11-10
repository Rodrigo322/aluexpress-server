import { Router } from "express";
import { register } from "./register";
import { getUserProfile } from "./get-user-profile";
import { getAllUser } from "./get-all-users";
import AuthMiddleware from "../../../../middlewares/authenticate";

export async function usersRoutes(app: Router) {
  app.post("/create-user", register);
  app.get("/get-unique-user/:id", getUserProfile);
  app.get("/get-all-users", AuthMiddleware.authenticate, getAllUser);
}
