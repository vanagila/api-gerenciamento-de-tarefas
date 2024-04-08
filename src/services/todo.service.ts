import { repository } from "../database/prisma.connection";
import { CreateTodoDTO, ResponseDTO } from "../dtos";
import { Todo as TodoPrisma } from "@prisma/client";
import { Todo } from "../models";

export class TodoService {
  public async createTodo(todoData: CreateTodoDTO): Promise<ResponseDTO> {
    const newTodo = await repository.todo.create({
      data: {
        content: todoData.content,
        done: todoData.done,
        userId: todoData.userId,
      },
    });

    return {
      code: 201,
      ok: true,
      message: "Tarefa criada com sucesso",
      data: this.mapToModel(newTodo),
    };
  }

  public async listTodos(userId: string | undefined): Promise<ResponseDTO> {
    const todos = await repository.todo.findMany({
      where: {
        userId,
      },
    });

    if (!todos.length) {
      return {
        code: 404,
        ok: false,
        message: "Lista de tarefas vazia",
      };
    }

    return {
      code: 200,
      ok: true,
      message: "Lista de tarefas carregada com sucesso",
      data: todos.map((todo) => this.mapToModel(todo)),
    };
  }

  private mapToModel(todo: TodoPrisma): Todo {
    return new Todo(todo.id, todo.content, todo.done);
  }
}
