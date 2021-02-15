const { response } = require("express");
const User = require("../models/user");
const { saveUser } = require("../store/auth");
const { generateJWT } = require("../helpers/jwt");
const { validatePassword } = require("../helpers/bcrypt");

const createUser = async (req, res = response) => {
  try {
    const { email } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(404).json({
        ok: false,
        msg: "email already exists",
      });
    }

    // Save in DB
    const user = await saveUser(req.body);

    // generate token
    const token = await generateJWT(user._id);

    res.json({ user, token, ok: true });
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

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      ok: false,
      msg: "User not found",
    });
  }

  const validPassword = validatePassword(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      ok: false,
      msg: "Passwords dont match",
    });
  }

  const token = await generateJWT(user._id);

  res.json({
    ok: true,
    user,
    token,
  });
};

const renewToken = async (req, res) => {
  const uid = req.uid;
  const token = await generateJWT(uid);
  const user = await User.findById(uid);

  res.json({
    ok: true,
    user,
    token,
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
