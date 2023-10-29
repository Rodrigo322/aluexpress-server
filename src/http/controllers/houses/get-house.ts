import { Request, Response } from "express";
import { makeGetHouseUseCase } from "../../../use-cases/factories/make-get-house-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function GetHouse(request: Request, response: Response) {
  const { houseId } = request.params;

  try {
    const getHouseUseCase = makeGetHouseUseCase();

    const house = await getHouseUseCase.execute({ houseId });

    return response.status(200).json(house);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(400).json({ error: error.message });
    }
  }
}
