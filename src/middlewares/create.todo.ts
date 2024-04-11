import { NextFunction, Request, Response } from "express";

export class TodoContent {
  public validate(req: Request, res: Response, next: NextFunction) {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        code: 400,
        ok: false,
        message: "Tarefa sem conteúdo",
      });
    }
    return next();
  }
}
