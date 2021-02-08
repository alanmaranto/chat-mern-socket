const { Router } = require("express");
const { createUser, login, renewToken } = require("../controllers/auth");
const router = Router();

// add users
router.post("/new", createUser);

//login
router.post("/", login);

// revalidate token
router.get("/renew", renewToken);

module.exports = router;
