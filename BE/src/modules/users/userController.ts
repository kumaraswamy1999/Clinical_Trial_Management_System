import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseUtil";
import { userValidator } from "../../validators/userValidator";
import Patient from "../../models/PatientModel";
import Researcher from "../../models/ResearcherModel";

import bcrypt from 'bcrypt';



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
   console.log(req.body)
    const { error } = userValidator.validate(req.body || {}, { abortEarly: false});
    const {role,password,...rest}= req.body

     if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      sendErrorResponse(400,res,"",errorMessages)
    }
  try {

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user based on role
    let user:any;
    if (role === 'patient') {
      user = new Patient({ ...rest, password: hashedPassword });
    } else if (role === 'researcher') {
      user = new Researcher({ ...rest, password: hashedPassword });
    } else {
      sendErrorResponse(400,res,"Invalid role specified","")
    }
  

    // Save user to DB
    await user.save();
    sendSuccessResponse(201,res,user,`successfully registered`)
  } 


  
  catch (error) {
    sendErrorResponse(500,res,"registration failed",error)
  }
}
