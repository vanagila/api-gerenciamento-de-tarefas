import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { JWTAdapter } from "../adapters";
import { envs } from "../envs";

export class Auth {
  public async validate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        code: 401,
        ok: false,
        message: "Token obrigatório",
      });
    }

    try {
      const decoded = token.split(" ")[1];
      const jwt = new JWTAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);
      const userAuth = jwt.decodeToken(decoded);

      if (!userAuth) {
        return res.status(401).json({
          code: 401,
          ok: false,
          message: "Token inválido",
        });
      }

      req.authorizedUser = userAuth;

      return next();
    } catch (error: any) {
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({
          code: 401,
          ok: false,
          message: "Token inválido",
        });
      }

      return {
        code: 500,
        ok: false,
        message: "Problema com o servidor",
      };
    }
  }
}
