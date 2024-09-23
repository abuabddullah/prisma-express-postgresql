import { Router } from "express";

import UserRoutesV1 from "./modules/userModules/v1/User.Routes.js";

const router = Router();

// * For User Routes
router.use("/api/v1/users", UserRoutesV1);

// // * For Post Routes
// router.use("/api/post", PostRoutes);

// // * For Post Routes
// router.use("/api/comment", CommentRoutes);

export default router;
