import prisma from "../../../DB/db.config.js";

export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      post: {
        include: {
          user: true,
        },
      },
    },
  });
  return res.json({ status: 200, data: comments });
};

export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  //   * Increase the comment counter
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  const newComent = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });

  return res.json({
    status: 200,
    data: newComent,
    msg: "Comment created successfully.",
  });
};

// * Show user
export const showComment = async (req, res) => {
  const commentId = req.params.id;
  const post = await prisma.comment.findFirst({
    where: {
      // id: Number(commentId),
      id: commentId,
    },
  });

  return res.json({ status: 200, data: post });
};

// * Delete user
export const deleteComment = async (req, res) => {
  const commentId = req.params.id; // used uuid

  // find if comment exits or not
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId, // used uuid
    },
  });

  if (!comment) {
    return res.json({ status: 404, msg: "Comment not found" });
  }

  //   * decrease the comment counter
  await prisma.post.update({
    where: {
      id: Number(comment?.post_id),
    },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });
  await prisma.comment.delete({
    where: {
      id: commentId, // used uuid
    },
  });

  return res.json({ status: 200, msg: "comment deleted successfully" });
};
