import { Router } from "express";
import appoitmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
import healthRouter from "./health.routes";

const routes = Router();

routes.use("/appointments", appoitmentsRouter);
routes.use("/users", usersRouter);
routes.use("/health", healthRouter);

export default routes;
