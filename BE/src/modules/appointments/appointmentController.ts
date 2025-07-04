import { Request, Response } from "express";
import {
  createAppointment,
  getAppointments,
  // getAppointmentById,
  // getAppointments,
  // updateAppointmentById,
} from "./appointmentService";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtil";
import { APPT_MESSAGES } from "./appointmentMessage";
import { getPaginationOptions } from "../../utils/pagination";

export const getAllAppointmentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { patientId, appId } = req.query;
    const pagination = getPaginationOptions(req.query);

    const filter: any = {};
    if (patientId) {
      filter.patientId = patientId;
    }

    const { appts, total } = await getAppointments({
      filter,
      sort: pagination.sort,
      skip: pagination.skip,
      limit: pagination.limit,
    });

    sendSuccessResponse(
      200,
      res,
      {
        data: appts,
        pagination: {
          total,
          page: Number(req.query.page || 1),
          limit: pagination.limit,
          totalPages: Math.ceil(total / pagination.limit),
        },
      },
      APPT_MESSAGES.FETCHED
    );
  } catch (error) {
    console.error("Error in getAppointments:", error);
    sendErrorResponse(500, res, error, APPT_MESSAGES.FETCH_ERROR);
  }
};

export const createAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const appt = await createAppointment(req.body);
    sendSuccessResponse(201, res, appt, APPT_MESSAGES.CREATED);
  } catch (error) {
    console.error("Error in createTrial:", error);
    sendErrorResponse(500, res, error, APPT_MESSAGES.CREATE_ERROR);
  }
};

// export const getTrialByIdController = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const trial = await getTrialById(id);
//     if (!trial) {
//       sendErrorResponse(404, res, null, TRIAL_MESSAGES.NOTFOUND);
//     }
//     sendSuccessResponse(200, res, trial, TRIAL_MESSAGES.FETCHED);
//   } catch (error) {
//     console.error("Error fetching trial by ID:", error);
//     sendErrorResponse(500, res, error, TRIAL_MESSAGES.FETCH_ERROR);
//   }
// };

// export const updateTrialByIdController = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const updatedTrial = await updateTrialById(id, updateData);

//     if (!updatedTrial) {
//       sendErrorResponse(404, res, null, TRIAL_MESSAGES.NOTFOUND);
//     }
//     sendSuccessResponse(200, res, updatedTrial, TRIAL_MESSAGES.UPDATED);
//   } catch (error) {
//     console.error("Error updating trial:", error);
//     sendErrorResponse(500, res, error, TRIAL_MESSAGES.UPDATE_ERROR);
//   }
// };
