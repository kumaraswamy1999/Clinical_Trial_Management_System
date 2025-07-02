import { Types } from "mongoose";
import { ITrial } from "../../models/trialModel";
import TrialModel from "../../models/trialModel";

interface CreateTrialInput {
  trialName: string;
  researcherId: Types.ObjectId;
  description?: string;
  period: string;
}

export const createTrial = async (data: CreateTrialInput): Promise<ITrial> => {
    console.log(data);
    
  const newTrial = new TrialModel({
    trialName: data.trialName,
    researcherId: data.researcherId,
    description: data.description,
    period: data.period,
  });

  return await newTrial.save();
};
