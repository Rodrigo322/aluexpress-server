import { House } from "@prisma/client";

import { IHouseRepository } from "../repositories/house-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetHouseRepositoryRequest {
  houseId: string;
}

interface GetHouseRepositoryResponse {
  house: House;
}

export class GetHouseUseCase {
  constructor(private houseRepository: IHouseRepository) {}

  async execute({
    houseId,
  }: GetHouseRepositoryRequest): Promise<GetHouseRepositoryResponse> {
    const house = await this.houseRepository.findById(houseId);

    if (!house) {
      throw new ResourceNotFoundError();
    }

    return { house };
  }
}
