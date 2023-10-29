import { PrismaHouseRepository } from "../../repositories/prisma/prisma-house-repository";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { RegisterHouseUseCase } from "../register-house-use-case";

export function makeRegisterHouseUseCase() {
  const houseRepository = new PrismaHouseRepository();
  const userRepository = new PrismaUserRepository();

  const registerHouseUseCase = new RegisterHouseUseCase(
    houseRepository,
    userRepository
  );

  return registerHouseUseCase;
}
