import { House } from "@prisma/client";

import { IHouseRepository } from "../repositories/house-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IUserRepository } from "../../Users/repositories/user-repository";

interface RegisterHouseUseCaseRequest {
  userId: string;
  address: string;
  latitude: number;
  longitude: number;
  price: string;
  description: string;
  footage: number;
  status: boolean;
  contract: boolean;
  contract_period?: number;
  water_and_electricity_included: boolean;
}

interface RegisterHouseUseCaseResponse {
  house: House;
}

export class RegisterHouseUseCase {
  constructor(
    private houseRepository: IHouseRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    userId,
    address,
    contract,
    description,
    footage,
    latitude,
    longitude,
    price,
    status,
    water_and_electricity_included,
    contract_period,
  }: RegisterHouseUseCaseRequest): Promise<RegisterHouseUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const house = await this.houseRepository.create({
      User: {
        connect: {
          id: userId,
        },
      },
      address,
      contract,
      description,
      footage,
      latitude,
      longitude,
      price,
      status,
      water_and_electricity_included,
      contract_period,
    });

    return { house };
  }
}
