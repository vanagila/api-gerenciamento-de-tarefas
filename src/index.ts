import cors from "cors";
import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando da porta ${process.env.PORT}`)
);

app.get("/", (_, res) => res.status(200).json({ ok: true }));
