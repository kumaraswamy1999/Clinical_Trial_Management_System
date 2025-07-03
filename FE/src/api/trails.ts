import type { UserQueryParams } from "../pages/trails/Trails";
import { httpClient } from "./httpClient";

export const getAllTrails = (params?: UserQueryParams) =>
  httpClient.get("/trails", params);

export const addTrail = (trailData) => httpClient.post("/trails", trailData);
