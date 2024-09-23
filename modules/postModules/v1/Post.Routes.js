import { Router } from "express";
import {
  createPost,
  fetchPosts,
  showPost,
  deletePost,
  searchPost,
  updatePost,
} from "./Post.Controller.js"; // extension .js is important

const router = Router();

router.get("/", fetchPosts);
router.get("/search", searchPost);
router.get("/:id", showPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
