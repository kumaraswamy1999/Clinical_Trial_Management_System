import { Router } from "express";
import {
  createTrialController,
  getAllTrailsController,
  getTrialByIdController,
  updateTrialByIdController,
} from "../modules/trials/trailController";

const router = Router();

// GET /trials/
router.get("/", getAllTrailsController);
// POST /trials/
router.post("/", createTrialController);
// GET:id /trials/
router.get("/:id", getTrialByIdController);
// PATCH /trials/
router.patch("/:id", updateTrialByIdController);

export default router;
