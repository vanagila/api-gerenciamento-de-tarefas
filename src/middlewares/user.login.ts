import { Request, Response, NextFunction } from "express";

export class Login {
  public validate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Todos os campos devem ser preenchidos",
      });
    }

    next();
  }
}
