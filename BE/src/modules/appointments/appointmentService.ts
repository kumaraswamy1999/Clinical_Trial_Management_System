import mongoose, { Types } from "mongoose";
import { IAppointment } from "../../models/appointmentModel";
import AppointmentModel from "../../models/appointmentModel";

interface CreateTrialInput {
  patientId: Types.ObjectId;
  trialId: Types.ObjectId;
  apptId?: string;
  apptDate: Date;
}

const createAppointmentId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `APT-${timestamp}-${random}`;
};

export const createAppointment = async (
  data: CreateTrialInput
): Promise<IAppointment> => {
  const newAppt = new AppointmentModel({
    patientId: data.patientId,
    trialId: data.trialId,
    apptId: createAppointmentId(),
    apptDate: data.apptDate,
  });
  return await newAppt.save();
};

interface QueryOptions {
  filter?: Record<string, any>;
  sort?: Record<string, 1 | -1>;
  skip?: number;
  limit?: number;
}

export const getAppointments = async ({
  filter = {},
  sort = { createdAt: -1 },
  skip = 0,
  limit = 10,
}: QueryOptions) => {
  const { researcherId, patientId } = filter;

  const matchConditions: any = {};

  if (researcherId) {
    matchConditions["trialDetails.researcherId"] = new mongoose.Types.ObjectId(
      researcherId
    );
  }

  if (patientId) {
    matchConditions["patientId"] = new mongoose.Types.ObjectId(patientId);
  }

  const appointments = await AppointmentModel.aggregate([
    {
      $lookup: {
        from: "trials",
        localField: "trialId",
        foreignField: "_id",
        as: "trialDetails",
      },
    },
    {
      $unwind: "$trialDetails",
    },
    {
      $match: matchConditions,
    },
    {
      $project: {
        apptId: 1,
        apptDate: 1,
        patientId: 1,
        trialName: "$trialDetails.trialName",
        trialId: "$trialDetails._id",
        description: "$trialDetails.description",
      },
    },
    { $sort: { apptDate: -1 } }, // Optional: sort by appointment date
    { $skip: skip },
    { $limit: limit },
  ]);

  const total = await AppointmentModel.countDocuments(filter);

  return { appointments, total };
};

// export const getTrialById = async (id: string) => {
//   return await TrialModel.findOne({ _id: id }).populate(
//     "researcherId",
//     "_id name"
//   );
// };

// export const updateTrialById = async (
//   id: string,
//   updateData: Record<string, any>
// ) => {
//   return await TrialModel.findOneAndUpdate({ _id: id }, updateData, {
//     new: true, // return the updated document
//     runValidators: true, // ensure schema validation
//   });
// };
