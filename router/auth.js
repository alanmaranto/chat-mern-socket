const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, renewToken } = require("../controllers/auth");
const router = Router();

// add users
router.post("/new", createUser);

//login
router.post("/", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
], login);

// revalidate token
router.get("/renew", renewToken);

module.exports = router;
