const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
