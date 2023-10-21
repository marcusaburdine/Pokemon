const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = { create, login, checkToken };

// CREATE USER AND JWT
async function create(req, res) {
  try {
    console.log("Inside create function", req.body);
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log("Error in Create", err);
    res.status(400).json(err);
  }
}

//USER LOGIN
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw new Error("User does not exist");

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) throw new Error("Passwords do not match");

    const token = createJWT(user);

    res.json(token);
  } catch (err) {
    console.log("Error in login function", err);
    res.status(400).json(err);
  }
}

function checkToken(req, res) {
  console.log("req.user", req.user);
  console.log("req.exp", req.exp);
  res.json(req.exp);
}

// HELPER FUNCTIONS:

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24hr" });
}
