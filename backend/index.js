const PORT = process.env.PORT || 3000; // Use default if not provided
const express = require("express");
const mongoose = require('mongoose');
const connection = require("./Config/db");
let jwt = require("jsonwebtoken");
const userController = require("./Controllers/user.routes");
const cors = require("cors");
const authentication = require("./Middleware/authentication");
require("dotenv").config();
const passport = require("./Config/google_auth");
const projectController = require("./Controllers/project.routes");
const taskController = require("./Controllers/task.routes");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {
    const email=req.user.email;
    const userId=req.user._id;
    let token = jwt.sign({email,userId}, process.env.SECRET);
    // console.log(token);
    // res.redirect("/");
    res.send({"message":"login Success","email":email,"token":token})
    // res.redirect('/');
  }
);

app.use("/", userController);
app.use("/", authentication);
app.use("/project", projectController);
app.use("/tasks", taskController);

app.listen(process.env.PORT, async () => {
  try {
    mongoose.set('strictQuery', false);
    await connection;
    console.log("Database Connected Successfully!");
  } catch (err) {
    console.log("Database Connection Error:",err);
  }
  console.log(`Server Listening on Port ${PORT}`);
});
