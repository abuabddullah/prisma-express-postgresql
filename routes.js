import { Router } from "express";

import UserRoutesV1 from "./modules/userModules/v1/User.Routes.js";
import UserRoutesV2 from "./modules/userModules/v2/User.Routes.js";

import PostRoutes from "./modules/postModules/v1/Post.Routes.js";
import CommentRoutes from "./modules/commentModules/v1/Comment.Routes.js";
import CourseRoutes from "./modules/CourseModules/v1/Course.Routes.js";
import StudentRoutes from "./modules/StudentModules/v1/Student.Routes.js";

const router = Router();

// * For User Routes
router.use("/api/v1/users", UserRoutesV1);
router.use("/api/v2/users", UserRoutesV2);

// // * For Post Routes
router.use("/api/v1/posts", PostRoutes);

// // * For Post Routes
router.use("/api/v1/comments", CommentRoutes);

// * For Course Routes
router.use("/api/v1/courses", CourseRoutes);

// * For Student Routes
router.use("/api/v1/students", StudentRoutes);

// * For 404
router.get("*", (req, res) => {
  return res.json({ status: 404, msg: "Page not found" });
});

export default router;
