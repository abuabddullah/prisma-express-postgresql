import { Router } from "express";
import { fetchAllStudents } from "./Student.Controller.js";

const router = Router();

router.get("/", fetchAllStudents);

export default router;
