import cors from "cors";
import express from "express";
import { envs } from "./envs";
import { authRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", authRoutes());

app.listen(envs.PORT, () =>
  console.log(`Servidor rodando da porta ${envs.PORT}`)
);

app.get("/", (_, res) => res.status(200).json({ ok: true }));
