import { User } from "@prisma/client";
import { hash } from "bcryptjs";

import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { UserRepository } from "../repositories/user-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  whatsapp: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    whatsapp,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      phone,
      whatsapp,
    });

    return { user };
  }
}
