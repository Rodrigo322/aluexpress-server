import { Prisma } from "@prisma/client";
import { IHouseRepository } from "../house-repository";
import { prisma } from "../../database/prisma";

export class PrismaHouseRepository implements IHouseRepository {
  async create(data: Prisma.HouseCreateInput) {
    const house = await prisma.house.create({ data });
    return house;
  }
}
