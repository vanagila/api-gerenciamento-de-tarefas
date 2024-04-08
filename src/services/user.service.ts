import { User as UserPrisma } from "@prisma/client";
import { ResponseDTO, UserRegisterDTO } from "../dtos";
import { repository } from "../database/prisma.connection";
import { User } from "../models";
import { BcryptAdapter } from "../adapters";
import { envs } from "../envs";

export class UserService {
  public async register(userData: UserRegisterDTO): Promise<ResponseDTO> {
    const emailAlreadyInUse = await repository.user.findUnique({
      where: { email: userData.email },
    });

    if (emailAlreadyInUse) {
      return {
        code: 400,
        ok: false,
        message: "E-mail já cadastrado",
      };
    }

    const bcrypt = new BcryptAdapter(Number(envs.BCRYPT_SALT));
    const hash = await bcrypt.generateHash(userData.password);

    const newUser = await repository.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hash,
      },
    });

    return {
      code: 201,
      ok: true,
      message: "Usuário cadastrado com sucesso",
      data: this.mapTpModel({ ...newUser }),
    };
  }

  private mapTpModel(userDB: UserPrisma): User {
    return new User(userDB.id, userDB.name, userDB.email, userDB.password);
  }
}
