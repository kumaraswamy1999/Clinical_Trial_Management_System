import { Request, Response } from "express";
import enrollment from "../../models/enrollment";



export const getAllEnrollments = async(req:Request,res:Response)=>{
 
}

export const createEnrollments = async(req:Request,res:Response)=>{
    try{
        const {patientId,trialId,status} = req.body;
        const filepath = req.file?.path;
    
        const newEnrollment  =  new enrollment({
            patientId:patientId,
            trialId:trialId,
            medicalDocument:filepath,
            status:status
        })
        await newEnrollment.save();
        res.status(201).send({message:'enrollement create successfully',payload:newEnrollment})
    }catch(error){
        res.status(500).send({message:'some thing went wrong'})
    }
}

export const getEnrollmentById = (req:Request,res:Response)=>{

}

export const updateEnrollmentById=(req:Request,res:Response)=>{

}