import { Prisma, House } from "@prisma/client";

export interface IHouseRepository {
  create(data: Prisma.HouseCreateInput): Promise<House>;
  findById(id: string): Promise<House | null>;
}
