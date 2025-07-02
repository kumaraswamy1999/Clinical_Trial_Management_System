import { Router } from "express";
import userRoutes from "./usersRoute";
import trailsRoute from "./trailsRoute";


const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use("/users", userRoutes);
router.use("/trails", trailsRoute);

export default router;
