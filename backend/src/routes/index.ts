
import express from "express";
import avaliadorRoutes from "./avaliadorRoutes";
import equipeRoutes from "./equipeRoutes";

const appRouter = express();

appRouter.use("/avaliadores", avaliadorRoutes);
appRouter.use("/equipes", equipeRoutes);

export default appRouter;