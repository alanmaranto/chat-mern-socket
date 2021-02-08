const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");
const router = Router();

// add users
router.post(
  "/new",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields,
  ],
  createUser
);

//login
router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

// revalidate token
router.get("/renew", renewToken);

module.exports = router;
