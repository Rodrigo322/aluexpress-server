import { prisma } from "../../../../database/prisma";
import { IAuthRepository } from "../auth-repository";

export class PrismaAuthRepository implements IAuthRepository {
  async singIn(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
