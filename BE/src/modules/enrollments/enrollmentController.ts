import { Request, Response } from "express";
import enrollment from "../../models/enrollment";
import { sendEmail } from "../../config/mailer";
import Patient from "../../models/PatientModel";
import trialModel from "../../models/trialModel";


export const getAllEnrollments = async (req: Request, res: Response) => {
    try {
        const response = await enrollment.find().populate('trialId').populate('patientId');
        res.status(200).send({ message: 'success', payload: response })
    } catch (error) {
        res.status(500).send({ message: 'something went wrong' })
    }
}

export const createEnrollments = async (req: Request, res: Response) => {
    try {
        const { patientId, trialId, status } = req.body;
        const filepath = req.file?.path;

        const enrollments = await enrollment.findOne({ patientId: patientId, trialId:trialId });
        if(!enrollments){
            const newEnrollment = new enrollment({
            patientId: patientId,
            trialId: trialId,
            medicalDocument: filepath,
            status: status
        })
        await newEnrollment.save();
        res.status(201).send({ message: 'enrollement create successfully', payload: newEnrollment })
        }else{
            res.status(409).send({message:'already enrolled'})
        }

    } catch (error) {
        res.status(500).send({ message: 'some thing went wrong' })
    }
}

export const getEnrollmentByPatientId = async(req: Request, res: Response) => {
    try{
        const {patientId} = req.params;
        console.log(patientId)
        const response = await enrollment.find({patientId:patientId}).populate('trialId')
        console.log(response)
        if(response.length){
            res.status(200).send({message:'success',payload:response})
        }else{
            res.status(404).send({message:'No Enrollments found'})
        }
    }catch(error){
        res.status(500).send({message:'some thing went wrong'})
    }
}
export const getEnrollmentByTrialId = async(req: Request, res: Response) => {
     try{
        const {trialId} = req.params;
        const response = await enrollment.find({trialId:trialId}).populate('patientId').populate('trialId')
        console.log(response)
        if(response.length){
            res.status(200).send({message:'success',payload:response})
        }else{
            res.status(404).send({message:'No Enrollments found'})
        }
    }catch(error){
        res.status(500).send({message:'some thing went wrong'})
    }
}

export const updateEnrollmentById = async(req: Request, res: Response) => {
    try{
        const updatedData = req.body;
        const {enrollmentId} = req.params;
        console.log(req.body)
        const data = await enrollment.findOneAndUpdate({ _id: enrollmentId},updatedData,{
            new:true
        });
        sendNotificationToPatient(data?.patientId,data?.status,data?.trialId)
        res.send({payload:data})

    }catch(error){
        res.status(500).send({message:'some thing went wrong'})
    }
}

const sendNotificationToPatient = async (patientId: any, status: any, trailId: any) => {
    try {
        const findPatient = await Patient.findById(patientId).select('name email')
        const findTrailName = await trialModel.findById(trailId).select('trialName')
        const message = status === 'accepted' ?
            `Hi ${findPatient?.name} your enrollement for the trail ${findTrailName?.trialName} has been approved please followup for appoinments` :
            `Hi ${findPatient?.name} your enrollement for the trail ${findTrailName?.trialName} has been rejected contact support team for more info`
        if (findPatient && findPatient?.email && findPatient?.name && findTrailName) {
            sendEmail('saisandy97@mailinator.com', `Enrollment ${status}`, message, '')
        }
    } catch (error) {
        console.log(error)
    }
}