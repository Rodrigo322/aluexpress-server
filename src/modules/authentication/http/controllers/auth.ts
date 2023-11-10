import { Request, Response } from "express";
import { makeAuthUseCase } from "../../use-cases/factories/make-auth-use-case";
import { InvalidAuthentication } from "../../use-cases/errors/invalid-authentication";

export async function auth(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const authUseCase = makeAuthUseCase();

    const token = await authUseCase.execute({
      email,
      password,
    });

    return res.status(200).json(token);
  } catch (error) {
    if (error instanceof InvalidAuthentication) {
      return res.status(404).json({ error: error.message });
    }
  }
}
