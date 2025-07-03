import { Router } from "express";
import userRoutes from "./usersRoute";
import trailsRoute from "./trailsRoute";
import enrollmentRouter from "./enrollmentRoute";


const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use("/users", userRoutes);
router.use("/trails", trailsRoute);
router.use('/enrollments',enrollmentRouter)

export default router;
