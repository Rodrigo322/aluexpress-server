import { Request, Response } from "express";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { makeGetAllUsersUseCase } from "../../../use-cases/factories/make-get-all-users-use-case";

export async function getAllUser(request: Request, response: Response) {
  try {
    const getAllUsersUseCase = makeGetAllUsersUseCase();

    const users = await getAllUsersUseCase.execute({});

    return response.status(200).json(users);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).json({ error: error.message });
    }
  }
}
