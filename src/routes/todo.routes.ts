import { Router } from "express";
import { TodoController } from "../controllers";
import { Auth, TodoContent } from "../middlewares";

export const todoRoutes = () => {
  const router = Router();
  const controller = new TodoController();
  const auth = new Auth();
  const content = new TodoContent();

  router.post("/", [auth.validate, content.validate, controller.postTodo]);
  router.get("/", auth.validate, controller.getTodos);
  router.get("/:id", auth.validate, controller.getTodoById);
  router.put("/:id", auth.validate, controller.updateTodo);
  router.delete("/:id", auth.validate, controller.deleteTodo);
  router.delete("/delete-all", auth.validate, controller.deleteAllTodos);

  return router;
};
