import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetAllUsersUseCaseResponse {
  users: User[];
}

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({}): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.userRepository.findMany();

    if (!users) {
      throw new ResourceNotFoundError();
    }

    return { users };
  }
}
