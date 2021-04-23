const Post = require("../models/Post");
const User = require("../models/User");

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).send("Post with this ID could not be found.");
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    //create post
    const userId = req.user;
    const post = await Post.create({ title, content, user: userId });
    // add post to user
    const user = await User.findById(userId);
    user.posts.push(post._id);
    await user.save();

    //return post
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndUpdate(postId, req.body, { new: true });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
