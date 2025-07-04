import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAppointment extends Document {
  patientId: Types.ObjectId;
  trialId: Types.ObjectId;
  apptId: string;
  apptDate: Date;
}

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    trialId: {
      type: Schema.Types.ObjectId,
      ref: "Trial",
      required: true,
    },
    apptDate: { type: Date, required: true },
    apptId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAppointment>("Appointment", appointmentSchema);
