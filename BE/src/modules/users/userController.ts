import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseUtil";
import { userValidator } from "../../validators/userValidator";
import Patient from "../../models/PatientModel";
import Researcher from "../../models/ResearcherModel";

import bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { env } from "../../config/envConfig";




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
    
    const userObj = user.toObject();
    delete userObj.password;

    sendSuccessResponse(201,res,userObj,`successfully registered`)
  } 


  
  catch (error) {
    sendErrorResponse(500,res,"registration failed",error)
  }
}

export const loginUser = async(req:Request,res:Response)=>{
  if(!Object.keys(req.body).length){
      sendErrorResponse(StatusCodes.BAD_REQUEST, res, {}, "Email and role are required");
  }
  const {email,password,role}= req.body
  try {
    let verifyUser:any;
    if (role === 'patient') {
      verifyUser = await Patient.findOne({email}).select('-__v -createdAt -updatedAt').lean();
      if(verifyUser){
        const verifyPassword = await bcrypt.compare(password,verifyUser.password)
        if (!verifyPassword) sendErrorResponse(StatusCodes.UNAUTHORIZED, res, {}, "Invalid credentails")
        
        const userPayload = {email,role}
        const generatedToken = jwt.sign(userPayload,env.JWT_ACCESS, { expiresIn:'1h' });

        const usercopy = {...verifyUser}
        delete usercopy.password
       
        const responseData = {...usercopy,token:generatedToken}
        sendSuccessResponse(StatusCodes.OK,res,responseData,`${role} logged in successfully`)

      }
    } else if (role === 'researcher') {
      verifyUser = await Researcher.findOne({ email});
    } else {
      sendErrorResponse(400,res,"Invalid credentials","Invalid credentials")
    }
  } catch (error) {
    sendErrorResponse(500,res,"something went wrong",error)
  }


}
