const { response } = require("express");
const { validationResult } = require("express-validator");

const createUser = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "Registered",
  });
};

const login = async (req, res = response) => {
  const errors = validationResult(req, res);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
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
