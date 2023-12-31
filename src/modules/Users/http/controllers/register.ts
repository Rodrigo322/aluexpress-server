import { Request, Response } from "express";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register-use-case";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";

export async function register(request: Request, response: Response) {
  const { name, email, password, phone, whatsapp } = request.body;

  try {
    const registerUserCase = makeRegisterUseCase();

    const user = await registerUserCase.execute({
      name,
      email,
      password,
      phone,
      whatsapp,
    });
    return response.status(201).json(user);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(400).json({ error: error.message });
    }
  }
}
