import { Request, Response } from "express";

import { makeRegisterHouseUseCase } from "../../../use-cases/factories/make-register-house-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function registerHouse(request: Request, response: Response) {
  const {
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
  } = request.body;
  const { userId } = request.params;

  try {
    const registerHouseUseCase = makeRegisterHouseUseCase();

    const house = await registerHouseUseCase.execute({
      address,
      contract,
      description,
      footage,
      latitude,
      longitude,
      price,
      status,
      userId,
      water_and_electricity_included,
      contract_period,
    });

    return response.status(201).json(house);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(400).json({ error: error.message });
    }
  }
}
