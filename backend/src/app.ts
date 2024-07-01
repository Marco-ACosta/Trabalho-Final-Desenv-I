import express from "express";
import appRouter from "./routes";
import cors from "cors"; // aqui usar o comando npm install @types/cors

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api", appRouter);

export default app;
