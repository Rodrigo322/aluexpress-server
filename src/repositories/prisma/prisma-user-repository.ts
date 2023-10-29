import { Prisma } from "@prisma/client";

import { prisma } from "../../database/prisma";
import { IUserRepository } from "../user-repository";

export class PrismaUserRepository implements IUserRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findMany() {
    const users = await prisma.user.findMany();
    return users;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
