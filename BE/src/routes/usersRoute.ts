import { Router } from "express";
import { getAllUsers } from "../modules/users/userController";

const router = Router();

// GET /users/
router.get("/", getAllUsers);

export default router;
