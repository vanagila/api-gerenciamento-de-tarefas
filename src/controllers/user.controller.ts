import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
  public async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const service = new UserService();

      const response = await service.register({
        name,
        email,
        password,
      });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const service = new UserService();

      const response = await service.login({
        email,
        password,
      });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        message: error.toString(),
      });
    }
  }
}
