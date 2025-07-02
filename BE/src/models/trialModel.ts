import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITrial extends Document {
  researcherId: Types.ObjectId;
  trialName: string;
  description: string;
  period: number;
}

const trialSchema = new mongoose.Schema(
  {
    researcherId: {
      type: Schema.Types.ObjectId,
      ref: "Researcher",
      required: true,
    },
    trialName: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    period: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITrial>("Trial", trialSchema);
