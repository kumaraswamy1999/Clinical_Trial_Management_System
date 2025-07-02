import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log("GET all users called");
    res.json({ message: "Fetched all users (demo)" });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
