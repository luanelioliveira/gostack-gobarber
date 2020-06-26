import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appoitmentsRouter = Router();

appoitmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appoitmentsRouter.post("/", async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
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

export default appoitmentsRouter;
