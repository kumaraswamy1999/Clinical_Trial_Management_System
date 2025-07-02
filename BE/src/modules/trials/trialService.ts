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
  const newTrial = new TrialModel({
    trialName: data.trialName,
    researcherId: data.researcherId,
    description: data.description,
    period: data.period,
  });
  return await newTrial.save();
};

interface QueryOptions {
  filter?: Record<string, any>;
  sort?: Record<string, 1 | -1>;
  skip?: number;
  limit?: number;
}

export const getTrials = async ({
  filter = {},
  sort = { createdAt: -1 },
  skip = 0,
  limit = 10,
}: QueryOptions) => {
  const trials = await TrialModel.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await TrialModel.countDocuments(filter);

  return { trials, total };
};
