import { PrismaHouseRepository } from "../../repositories/prisma/prisma-house-repository";
import { GetHouseUseCase } from "../get-house-use-case";

export function makeGetHouseUseCase() {
  const houseRepository = new PrismaHouseRepository();
  const getHouseUseCase = new GetHouseUseCase(houseRepository);

  return getHouseUseCase;
}
