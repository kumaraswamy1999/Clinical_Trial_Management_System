import mongoose from "mongoose";


const enrollmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    trialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trial', required: true, },
    medicalDocument: { type: String, required: true },
    status:{type:String,required:true}
},{ timestamps: true })

export default mongoose.model('EnrollmentDocument',enrollmentSchema);