// authService.ts
import jwt from "jsonwebtoken";

interface AuthPayload {
  userId: string;
}

export default class AuthService {
  static generateToken(userId: string) {
    const payload: AuthPayload = { userId };
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!SECRET_KEY) {
      throw new Error("Invalid secret key");
    }
    return jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1d",
    });
  }
}
