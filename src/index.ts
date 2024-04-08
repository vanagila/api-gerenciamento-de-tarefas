import cors from "cors";
import express from "express";
import "dotenv/config";
import { userRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", userRoutes());

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando da porta ${process.env.PORT}`)
);

app.get("/", (_, res) => res.status(200).json({ ok: true }));
