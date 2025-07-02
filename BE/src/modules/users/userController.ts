import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseUtil";
import { roles } from "../../common/roles";
import { userRequest } from "../../interfaces/userInterface";
import { researchValidator } from "../../validators/reseachValidator";


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log("GET all users called");
    res.json({ message: "Fetched all users (demo)" });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const registerUser = async(req:Request,res:Response)=>{
  try {
    console.log(req.body)
    const { error } = researchValidator.validate(req.body || {}, { abortEarly: false, allowUnknown: false, });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      sendErrorResponse(400,res,"",errorMessages)
    }

    sendSuccessResponse(200,res,roles,`successfully registered`)
  } catch (error) {
    
  }
}
