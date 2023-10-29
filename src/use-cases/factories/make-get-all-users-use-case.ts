import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { GetAllUsersUseCase } from "../get-all-users-use-case";

export function makeGetAllUsersUseCase() {
  const userRepository = new PrismaUserRepository();
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

  return getAllUsersUseCase;
}
