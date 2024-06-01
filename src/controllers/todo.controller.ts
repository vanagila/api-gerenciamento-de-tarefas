import { Request, Response } from "express";
import { TodoService } from "../services";
import { UpdateTodoDTO } from "../dtos";
import { decode } from "punycode";

export class TodoController {
  public async postTodo(req: Request, res: Response) {
    try {
      const { content, done } = req.body;

      const { id } = req.authorizedUser;

      const service = new TodoService();

      const response = await service.createTodo({
        content,
        done: done ?? false,
        userId: id,
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

  public async getTodos(req: Request, res: Response) {
    try {
      const { user } = req.query;

      const service = new TodoService();
      const response = await service.listTodos(user as string | undefined);

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async getTodoById(req: Request, res: Response) {
    try {
      const todoId = req.params.id;

      const service = new TodoService();

      const response = await service.listById({ todoId });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async updateTodo(req: Request, res: Response) {
    try {
      const todoId = req.params.id;

      const service = new TodoService();

      const response = await service.updateTodo({ todoId });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async deleteTodo(req: Request, res: Response) {
    try {
      const todoId = req.params.id;

      const service = new TodoService();

      const response = await service.deleteTodo({ todoId });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async deleteAllTodos(req: Request, res: Response) {
    try {
      const userId = req.headers["user-id"];
      if (!userId) {
        return res.status(401).json({
          code: 401,
          ok: false,
          message: "ID do usuário não fornecido no cabeçalho da requisição",
        });
      }

      const service = new TodoService();
      const response = await service.deleteAllTodos(userId as string);

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
