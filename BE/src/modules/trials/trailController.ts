import { Request, Response } from "express";
import { createTrial, getTrials } from "./trialService";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtil";
import { TRIAL_MESSAGES } from "./trialMessage";
import { getPaginationOptions } from "../../utils/pagination";

export const getAllTrailsController = async (req: Request, res: Response) => {
  try {
    const { researcherId } = req.query;
    const pagination = getPaginationOptions(req.query);

    const filter: any = {};
    if (researcherId) {
      filter.researcherId = researcherId;
    }

    const { trials, total } = await getTrials({
      filter,
      sort: pagination.sort,
      skip: pagination.skip,
      limit: pagination.limit,
    });

    sendSuccessResponse(
      200,
      res,
      {
        data: trials,
        pagination: {
          total,
          page: Number(req.query.page || 1),
          limit: pagination.limit,
          totalPages: Math.ceil(total / pagination.limit),
        },
      },
      TRIAL_MESSAGES.FETCHED
    );
  } catch (error) {
    console.error("Error in getTrails:", error);
    sendErrorResponse(500, res, error, TRIAL_MESSAGES.FETCH_ERROR);
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
