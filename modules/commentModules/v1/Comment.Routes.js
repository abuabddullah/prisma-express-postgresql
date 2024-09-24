import { Router } from "express";
import {
  createComment,
  fetchComments,
  showComment,
  deleteComment,
} from "./Comment.Controller.js";

const router = Router();

router.get("/", fetchComments);
router.get("/:id", showComment);
router.post("/", createComment);
router.delete("/:id", deleteComment);

export default router;
