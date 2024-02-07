const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

const app = express();
const PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/zenquill")
  .then((e) => console.log("MongoDB Connected"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
app.use("/user", userRoute);
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
