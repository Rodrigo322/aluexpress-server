// authService.ts
import jwt from "jsonwebtoken";

interface AuthPayload {
  userId: string;
}

export default class AuthService {
  static generateToken(userId: string) {
    const payload: AuthPayload = { userId };
    return jwt.sign(payload, process.env.SECRET_KEY || "dev", {
      expiresIn: "1d",
    });
  }
}
