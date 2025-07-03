import { Router } from "express";
import { getAllUsers, loginUser, registerUser } from "../modules/users/userController";

const router = Router();

// GET /users/
router.get("/", getAllUsers);


// Regsiter new User
router.post("/register",registerUser)
router.post("/login",loginUser)

export default router;
