const { response } = require("express");
const User = require("../models/user");
const { saveUser } = require("../store/auth");
const { generateJWT} = require("../helpers/jwt")


const createUser = async (req, res = response) => {
  try {
    const { email } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "email already exists",
      });
    }

    // Save in DB
    const user = await saveUser(req.body);

    const token = await generateJWT(user._id)

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error trying to create user",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "Login",
    email,
    password,
  });
};

const renewToken = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
