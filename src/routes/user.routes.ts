import { Router } from "express";
import { UserController } from "../controllers";
import { Login, Register } from "../middlewares";

export const authRoutes = () => {
  const router = Router();
  const controller = new UserController();
  const register = new Register();
  const login = new Login();

  router.post("/", [register.validate], controller.register);
  router.post("/login", [login.validate], controller.login);

  return router;
};
