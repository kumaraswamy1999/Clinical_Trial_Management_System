import { Request, Response } from "express";
import {
  createTrial,
  getTrialById,
  getTrials,
  updateTrialById,
} from "./trialService";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtil";
import { TRIAL_MESSAGES } from "./trialMessage";
import { getPaginationOptions } from "../../utils/pagination";

export const getAllTrailsController = async (req: Request, res: Response) => {
  try {
    const { researcherId, search } = req.query;
    const pagination = getPaginationOptions(req.query);

    const filter: any = {};
    if (researcherId) {
      filter.researcherId = researcherId;
    }

    if (search) {
      filter.trialName = { $regex: search, $options: "i" };
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

export const getTrialByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const trial = await getTrialById(id);
    if (!trial) {
      sendErrorResponse(404, res, null, TRIAL_MESSAGES.NOTFOUND);
    }
    sendSuccessResponse(200, res, trial, TRIAL_MESSAGES.FETCHED);
  } catch (error) {
    console.error("Error fetching trial by ID:", error);
    sendErrorResponse(500, res, error, TRIAL_MESSAGES.FETCH_ERROR);
  }
};

export const updateTrialByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTrial = await updateTrialById(id, updateData);

    if (!updatedTrial) {
      sendErrorResponse(404, res, null, TRIAL_MESSAGES.NOTFOUND);
    }
    sendSuccessResponse(200, res, updatedTrial, TRIAL_MESSAGES.UPDATED);
  } catch (error) {
    console.error("Error updating trial:", error);
    sendErrorResponse(500, res, error, TRIAL_MESSAGES.UPDATE_ERROR);
  }
};
