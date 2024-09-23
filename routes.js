import { Router } from "express";

import UserRoutesV1 from "./modules/userModules/v1/User.Routes.js";
import UserRoutesV2 from "./modules/userModules/v2/User.Routes.js";

import PostRoutes from "./modules/postModules/v1/Post.Routes.js";

const router = Router();

// * For User Routes
router.use("/api/v1/users", UserRoutesV1);
router.use("/api/v2/users", UserRoutesV2);

// // * For Post Routes
router.use("/api/v1/post", PostRoutes);

// // * For Post Routes
// router.use("/api/comment", CommentRoutes);

export default router;
