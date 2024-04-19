import { repository } from "../database/prisma.connection";
import { CreateTodoDTO, ResponseDTO, UpdateTodoDTO } from "../dtos";
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
    try {
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

      const mappedTodos = todos.map((todo) => this.mapToModel(todo));

      return {
        code: 200,
        ok: true,
        message: "Lista de tarefas carregada com sucesso",
        data: mappedTodos,
      };
    } catch (error) {
      return {
        code: 404,
        ok: false,
        message: "Erro ao carregar todas as tarefas do usuário: " + error,
      };
    }
  }

  public async listById(todoData: UpdateTodoDTO): Promise<ResponseDTO> {
    const existingTodo = await repository.todo.findUnique({
      where: {
        id: todoData.todoId,
      },
    });

    if (!existingTodo) {
      return {
        code: 404,
        ok: false,
        message: "Tarefa não encontrada",
      };
    }

    return {
      code: 200,
      ok: true,
      message: "Tarefa carregada com sucesso",
      data: this.mapToModel(existingTodo),
    };
  }

  public async updateTodo(todoData: UpdateTodoDTO): Promise<ResponseDTO> {
    const existingTodo = await repository.todo.findUnique({
      where: {
        id: todoData.todoId,
      },
    });

    if (!existingTodo) {
      return {
        code: 404,
        ok: false,
        message: "Tarefa não encontrada",
      };
    }

    const updatedTodo = await repository.todo.update({
      where: {
        id: todoData.todoId,
      },
      data: {
        done: true,
      },
    });

    return {
      code: 200,
      ok: true,
      message: "Tarefa atualizada com sucesso",
      data: this.mapToModel(updatedTodo),
    };
  }

  public async deleteTodo(todoData: UpdateTodoDTO): Promise<ResponseDTO> {
    const existingTodo = await repository.todo.findUnique({
      where: {
        id: todoData.todoId,
      },
    });

    if (!existingTodo) {
      return {
        code: 404,
        ok: false,
        message: "Tarefa não encontrada",
      };
    }

    await repository.todo.delete({
      where: {
        id: todoData.todoId,
      },
    });

    return {
      code: 200,
      ok: true,
      message: "Tarefa excluída com sucesso",
    };
  }

  public async deleteAllTodos(userId: string | undefined) {
    try {
      await repository.todo.deleteMany({
        where: {
          userId,
        },
      });

      return {
        code: 200,
        ok: true,
        message: "Todas as tarefas foram removidas com sucesso",
      };
    } catch (error) {
      return {
        code: 404,
        ok: false,
        message: "Erro ao carregar todas as tarefas do usuário: " + error,
      };
    }
  }

  private mapToModel(todo: TodoPrisma): Todo {
    return new Todo(todo.id, todo.content, todo.done, todo.createdAt);
  }
}
