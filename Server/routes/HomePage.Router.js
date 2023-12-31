const getMovieData = require("../models/HomePage.Models");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await getMovieData();
  console.log(result);
  res.send(result);
});

module.exports = router;
