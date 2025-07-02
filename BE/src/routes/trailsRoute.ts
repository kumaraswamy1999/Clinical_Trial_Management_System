import { Router } from "express";
import {
  createTrialController,
  getAllTrailsController,
} from "../modules/trials/trailController";

const router = Router();

// GET /trials/
router.get("/", getAllTrailsController);
// POST /trials/
router.post("/", createTrialController);

export default router;
