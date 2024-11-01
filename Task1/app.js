const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const flash = require('connect-flash');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.successMessage = req.flash('success');
  res.locals.errorMessage = req.flash('error');
  next();
});

app.get("/", function (req, res) {
  res.render("register");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async function (req, res) {
  try {
    const { name, username, password, email, age } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      req.flash('error', 'User already exists.');
      return res.redirect('/register');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.create({
      name,
      username,
      age,
      email,
      password: hashedPassword,
    });

    req.flash('success', 'User registered successfully!');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred while registering.');
    res.redirect('/register');
  }
});

app.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash('error', 'User does not exist.');
      return res.redirect('/login');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      req.flash('error', 'Incorrect password.');
      return res.redirect('/login');
    }

    req.flash('success', 'User logged in successfully!');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred during login.');
    res.redirect('/login');
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
