import { House } from "@prisma/client";

import { IUserRepository } from "../../Users/repositories/user-repository";
import { IHouseRepository } from "../repositories/house-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface Image {
  url: string;
}

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
  images: Image[];
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
    images,
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
      Images: {
        create: images,
      },
    });

    return { house };
  }
}
