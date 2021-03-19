import { Router } from "express";

const sessionsRouter = Router();

sessionsRouter.get("/", async (request, response) => {
  try {
    return response.json({ status: 'OK' });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
  });

export default sessionsRouter;

