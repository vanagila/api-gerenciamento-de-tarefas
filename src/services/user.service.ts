import { User as UserPrisma } from "@prisma/client";
import { ResponseDTO, userLoginDTO, userRegisterDTO } from "../dtos";
import { repository } from "../database/prisma.connection";
import { User } from "../models";
import { randomUUID } from "crypto";

export class UserService {
  public async register(userData: userRegisterDTO): Promise<ResponseDTO> {
    const emailAlreadyInUser = await repository.user.findUnique({
      where: { email: userData.email },
    });

    if (emailAlreadyInUser) {
      return {
        code: 400,
        ok: false,
        message: "E-mail já cadastrado",
      };
    }

    const newUser = await repository.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
    });

    return {
      code: 201,
      ok: true,
      message: "Usuário cadastrado com sucesso",
      data: this.mapTpModel({ ...newUser }),
    };
  }

  public async login(userData: userLoginDTO): Promise<ResponseDTO> {
    const userFound = await repository.user.findUnique({
      where: {
        email: userData.email,
        password: userData.password,
      },
    });

    if (!userFound) {
      return {
        code: 401,
        ok: false,
        message: "Dados inválidos",
      };
    }

    const token = randomUUID();

    await repository.user.update({
      where: { id: userFound.id },
      data: { authToken: token },
    });

    return {
      code: 201,
      ok: true,
      message: "Usuário cadastrado com sucesso",
      data: { token },
    };
  }

  private mapTpModel(userDB: UserPrisma): User {
    return new User(userDB.id, userDB.name, userDB.email, userDB.password);
  }
}
