import { Request, Response } from "express";
import { createTrial } from "./trialService";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtil";
import { TRIAL_MESSAGES } from "./trialMessage";

export const getAllTrailsController = async (req: Request, res: Response) => {
  try {
    console.log("GET all trail called");
    res.json({ message: "Fetched all trail (demo)" });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTrialController = async (req: Request, res: Response) => {
  try {
    const trial = await createTrial(req.body);
    sendSuccessResponse(201, res, trial, TRIAL_MESSAGES.CREATED);
  } catch (error) {
    console.error("Error in createTrial:", error);
    sendErrorResponse(500, res, error, TRIAL_MESSAGES.CREATE_ERROR);
  }
};
