import { Request, Response } from "express";
import { makeGetUserProfileUseCase } from "../../../use-cases/factories/make-get-user-profile-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function getUserProfile(request: Request, response: Response) {
  const { id } = request.params;
  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const user = await getUserProfileUseCase.execute({
      userId: id,
    });

    return response.status(200).json(user);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).json({ error: error.message });
    }
  }
}
