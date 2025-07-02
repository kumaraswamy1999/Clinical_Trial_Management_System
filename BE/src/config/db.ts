import mongoose from "mongoose";
import { env } from "./env";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      dbName: process.env.DATABASE_NAME || "",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("failed to connect to Mongodb", error);
    process.exit(1);
  }
};

export default connectDB;
