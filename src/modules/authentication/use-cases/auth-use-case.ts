import { User } from "@prisma/client";
import { IAuthRepository } from "../repositories/auth-repository";
import { compare } from "bcryptjs";
import AuthService from "../auth-services";

interface AuthUseCaseRequest {
  email: string;
  password: string;
}

interface AuthUseCaseResponse {
  token: string;
}

export class AuthUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute({
    email,
    password,
  }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const user = await this.authRepository.singIn(email, password);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordsValid = await compare(password, user.password);

    if (!isPasswordsValid) {
      throw new Error("Passwords not valid");
    }

    const token = AuthService.generateToken(user.id);

    return { token };
  }
}
