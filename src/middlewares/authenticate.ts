// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthPayload {
  userId: string;
}

export default class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const SECRET_KEY = process.env.SECRET_KEY;

    if (!SECRET_KEY) {
      throw new Error("Invalid secret key");
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const payload = decoded as AuthPayload;
      req.user = { id: payload.userId };
      next();
    });
  }
}
