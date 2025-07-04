import { Router } from "express";
import {
  createAppointmentController,
  getAllAppointmentsController,
} from "../modules/appointments/appointmentController";

const router = Router();

// GET /appointments/
router.get("/", getAllAppointmentsController);
// POST /appointments/
router.post("/", createAppointmentController);
// GET:id /appointments/
// router.get("/:id", getAppointmentByIdController);
// // PATCH /appointments/
// router.patch("/:id", updateAppointmentByIdController);

export default router;
