require("dotenv").config();
const express = require("express");

// connecting to database
require("./config/dbConnect");

// consting routes
const postRoutes = require("./routers/postRoutes");
const authRoutes = require("./routers/authRoutes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// catch all routes not on the server
app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ message: `Cannot find ${req.originalUrl} on the server` });
});

//
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});

module.exports = app.listen(4000, () => console.log("Server up and running"));
