import { BcryptAdapter, JWTAdapter } from "../adapters";
import { repository } from "../database/prisma.connection";
import { ResponseDTO, UserLoginDTO } from "../dtos";
import { envs } from "../envs";

export class AuthService {
  public async login(userData: UserLoginDTO): Promise<ResponseDTO> {
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

    const bcrypt = new BcryptAdapter(Number(envs.BCRYPT_SALT));
    const matches = await bcrypt.matchesHash(
      userData.password,
      userFound.password
    );

    if (!matches) {
      return {
        code: 401,
        ok: false,
        message: "Dados inválidos",
      };
    }

    const payloadToken = {
      id: userFound.id,
      email: userFound.email,
    };

    const jwt = new JWTAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);
    const token = jwt.generateToken(payloadToken);

    return {
      code: 201,
      ok: true,
      message: "Login feito com sucesso",
      data: { token, user: payloadToken },
    };
  }
}
