import type { UserQueryParams } from "../pages/appointment/Appointments";
import { httpClient } from "./httpClient";

export const getAllAppointments = (params?: UserQueryParams) =>
  httpClient.get("/appointments", params);

export const addAppointments = (data) => httpClient.post("/appointments", data);
