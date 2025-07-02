import { Router } from "express";
import userRoutes from "./usersRoute";

const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use("/users", userRoutes);

export default router;
