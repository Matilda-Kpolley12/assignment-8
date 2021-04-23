const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required."],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
