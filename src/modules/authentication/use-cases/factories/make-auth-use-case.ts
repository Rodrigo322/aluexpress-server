import { PrismaAuthRepository } from "../../repositories/prisma/prisma-auth-repository";
import { AuthUseCase } from "../auth-use-case";

export function makeAuthUseCase() {
  const authRepository = new PrismaAuthRepository();
  const authUseCase = new AuthUseCase(authRepository);

  return authUseCase;
}
