import { Request, Response } from "express";
import { ResourceNotFoundError } from "../../use-cases/errors/resource-not-found-error";
import { makeRegisterHouseUseCase } from "../../use-cases/factories/make-register-house-use-case";

const IMAGES_BASE_URL =
  process.env.IMAGES_BASE_URL || "http://localhost:3333/images/";

export async function registerHouse(request: Request, response: Response) {
  try {
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

    if (
      !address ||
      !contract ||
      !description ||
      !footage ||
      !latitude ||
      !longitude ||
      !price ||
      !status ||
      !userId
    ) {
      return response.status(400).json({ error: "Missing required fields." });
    }

    const registerHouseUseCase = makeRegisterHouseUseCase();
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => ({
      url: `${IMAGES_BASE_URL}${image.filename}`,
    }));

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
      images,
    });

    return response.status(201).json(house);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(400).json({ error: error.message });
    }
  }
}
