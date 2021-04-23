const User = require("../models/User");
const httpErrors = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidator, loginValidator } = require("../utils/validation");

const register = async (req, res) => {
  // check if all fields are available
  // if (!firstName || !lastName || !email || !password) {
  //   res
  //     .status(400)
  //     .json({ message: "Please enter all fields." });
  //   return;
  // }

  const result = await registerValidator.validateAsync(req.body);
  const { firstName, lastName, email, password } = result;

  // check if email is already in the database
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    res.status(400).json({ message: "Email already exists." });
    return;
  }

  // hash the password
  // const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, 12);

  // create the user
  // const user = new User({ firstName, lastName, email, password });
  // user.profile = "http://localhost:4000/image.jpg"
  // const newUser = await user.save();

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ user });
};

const login = async (req, res) => {
  // check if all fields are available
  // if (!email || !password) {
  //   res
  //     .status(httpErrors.BadRequest)
  //     .json({ message: "Please enter all fields." });
  //   return;
  // }
  const result = await loginValidator.validateAsync(req.body);
  const { email, password } = result;

  // check if email is in the database
  let user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  // check for password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  // generate token
  const token = jwt.sign({ id: user._id }, "123456789", {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"] || "";

  token = token.split(" ")[1];
  if (token) {
    const decodedToken = jwt.verify(token, "123456789");
    req.user = decodedToken.id;
    next();
  } else {
    res.status(403).json({ message: "Unauthotized" });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};
