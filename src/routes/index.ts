import { Router } from "express";
import appoitmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
import healthCheckRouter from "./healthcheck.routes";
import sessionRouter from "./session.routes";

const routes = Router();

routes.use("/health", healthCheckRouter);
routes.use("/appointments", appoitmentsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);

export default routes;
