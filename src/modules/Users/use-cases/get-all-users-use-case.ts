import { User } from "@prisma/client";
import { IUserRepository } from "../repositories/user-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetAllUsersUseCaseResponse {
  users: User[];
}

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({}): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.userRepository.findMany();

    if (!users) {
      throw new ResourceNotFoundError();
    }

    return { users };
  }
}
