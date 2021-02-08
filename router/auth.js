const { Router } = require("express");

const router = Router();

// add users
router.post("/new", (req, res) => {
  res.json({
    ok: true,
    msg: "Registered",
  });
});

//login
router.post("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Login",
  });
});

// revalidate token
router.get("/renew", (req, res) => {
  res.json({
    ok: true,
    msg: "renew",
  });
});

module.exports = router;
