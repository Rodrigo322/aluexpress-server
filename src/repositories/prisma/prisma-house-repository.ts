import { Prisma } from "@prisma/client";

import { IHouseRepository } from "../house-repository";
import { prisma } from "../../database/prisma";
import { ResourceNotFoundError } from "../../use-cases/errors/resource-not-found-error";

export class PrismaHouseRepository implements IHouseRepository {
  async create(data: Prisma.HouseCreateInput) {
    const house = await prisma.house.create({ data });
    return house;
  }

  async findById(id: string) {
    const house = await prisma.house.findUnique({
      where: { id: id },
    });

    if (!house) {
      throw new ResourceNotFoundError();
    }

    return house;
  }
}
