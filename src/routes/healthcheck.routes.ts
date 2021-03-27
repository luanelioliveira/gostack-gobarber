import { Router } from "express";

const healthCheckRouter = Router();

healthCheckRouter.get("/", async (request, response) => {
  return response.json({ status: "OK" });
});

export default healthCheckRouter;
