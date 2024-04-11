import { NextFunction, Request, Response } from "express";

export class TodoUpdate {
  public validate(req: Request, res: Response, next: NextFunction) {
    const { done } = req.body;

    if (done === undefined || typeof done !== "boolean") {
      return res.status(400).json({
        code: 400,
        ok: false,
        message: "Campo 'done' inválido. Deve ser um booleano",
      });
    }
    return next();
  }
}
