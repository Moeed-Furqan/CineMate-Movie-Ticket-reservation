const {
  getShowId,
  getUserId,
  updateSeats,
  insertBooking,
} = require("../models/Payment.Models");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Coming peacefully", req.body);
  const result = await getShowId(
    req.body.movieId,
    req.body.date,
    req.body.time
  );
  console.log(result);
  const showId = result[0].show_id;
  console.log(showId);
  const userResult = await getUserId(req.body.username);
  const userId = userResult[0].web_user_id;
  console.log(userId);
  const seatResult = await updateSeats(req.body.stringArray, showId);
  const bookingInsertion = await insertBooking(
    req.body.tickets,
    req.body.cost,
    userId,
    showId
  );
  res.send(true);
});

module.exports = router;
