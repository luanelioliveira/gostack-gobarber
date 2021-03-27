import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appoitmentsRouter = Router();

appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appoitmentsRouter.get("/:id", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointmentId = request.params.id;

  const findAppointment = await appointmentsRepository.findById(appointmentId);

  if (!findAppointment) {
    return response.status(404).json({ message: "Appointment not found" });
  }

  return response.json(findAppointment);
});

appoitmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appoitmentsRouter;
