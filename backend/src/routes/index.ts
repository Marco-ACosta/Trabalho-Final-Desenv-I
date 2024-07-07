
import express from "express";
import avaliadorRoutes from "./avaliadorRoutes";
import equipeRoutes from "./equipeRoutes";
import avaliacaoRoutes from "./avaliacaoRoutes";

const appRouter = express();

appRouter.use("/avaliadores", avaliadorRoutes);
appRouter.use("/equipes", equipeRoutes);
appRouter.use("/avaliacoes", avaliacaoRoutes);

export default appRouter;