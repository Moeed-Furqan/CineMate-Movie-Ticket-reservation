const { loginUser, signUpUser } = require("../models/LoginSignup.Model");

const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("Coming to Login route ", req.body.email, req.body.password);
  const result = await loginUser(req.body.email, req.body.password);
  console.log(result[0].exists);
  res.send(result[0].exists);
});

router.post("/signup", async (req, res) => {
  console.log("Coming to signup route ", req.body.email, req.body.password);
  const result = await signUpUser(req.body.email, req.body.password);
  console.log(result);
  res.send(result);
});

module.exports = router;
