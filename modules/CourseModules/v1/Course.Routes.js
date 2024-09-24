import { Router } from "express";
import {
  createCourse,
  fetchCourses,
  showCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
} from "./Course.Controller.js";

const router = Router();

router.post("/", createCourse);
router.get("/", fetchCourses);
router.get("/:id", showCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.post("/enroll/:id", enrollCourse);

export default router;
