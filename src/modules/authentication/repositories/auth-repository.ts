import { User } from "@prisma/client";

export interface IAuthRepository {
  singIn(email: string, password: string): Promise<User | null>;
}
