require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected to MongoDB!"));

// controllers
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const authController = require("./controllers/authController");

const PORT = process.env.PORT || 8000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// routes
server.post("/login", loginController);
server.get("/profile", authController);
server.post("/signup", signupController);

server.listen(PORT, () => {
  console.log("listening on port", PORT);
});
