const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../controllers/authController");

router
  .route("/")
  .get(postController.getAllPost)
  .post(postController.createPost);

router
  .route("/:postId")
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
