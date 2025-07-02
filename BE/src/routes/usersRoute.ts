import { Router } from "express";
import { getAllUsers, registerUser } from "../modules/users/userController";

const router = Router();

// GET /users/
router.get("/", getAllUsers);


// Regsiter new User
router.post("/register",registerUser)

export default router;
