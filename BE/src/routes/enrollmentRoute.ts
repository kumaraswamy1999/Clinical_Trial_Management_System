import { Router } from "express";
import { createEnrollments, getAllEnrollments, getEnrollmentByPatientId,getEnrollmentByTrialId, updateEnrollmentById } from "../modules/enrollments/enrollmentController";
import multer from "multer";

const enrollmentRouter = Router();

//multer setup
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,'uploads/')},
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
})
export const upload = multer({storage});

enrollmentRouter.post('/createEnrollment',upload.single('doc'),createEnrollments);

enrollmentRouter.patch('/updateEnrollment/:enrollmentId',updateEnrollmentById);

enrollmentRouter.get('/getPatientEnrollment/:patientId',getEnrollmentByPatientId);

enrollmentRouter.get('/getTrialEnrollment/:trialId',getEnrollmentByTrialId);

enrollmentRouter.get('/getAllEnrollments',getAllEnrollments);


export default enrollmentRouter;