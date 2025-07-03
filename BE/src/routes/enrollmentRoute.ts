import { Router } from "express";
import { createEnrollments, getAllEnrollments, getEnrollmentById, updateEnrollmentById } from "../modules/enrollments/enrollmentController";
import multer from "multer";

const enrollmentRouter = Router();

//multer setup
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,'uploads/')},
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
})
export const upload = multer({storage});

enrollmentRouter.post('/createEnrollment',upload.single('doc'),createEnrollments);

enrollmentRouter.patch('/updateEnrollment/:id',updateEnrollmentById);

enrollmentRouter.get('/getEnrollment/:id',getEnrollmentById);

enrollmentRouter.get('/getAllEnrollments',getAllEnrollments);


export default enrollmentRouter;