import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../utils/reponseUtil";
import { StatusCodes } from "http-status-codes";
import messages from "./userMessage";
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    sendSuccessResponse(StatusCodes.OK, res, {}, messages.GET_ALL_USER_SUCCESS);
  } catch (error) {
    sendErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      res,
      error,
      messages.GET_ALL_USER_FAILED
    );
  }
};
