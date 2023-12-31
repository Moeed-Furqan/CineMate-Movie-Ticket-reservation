const express = require("express");
require("dotenv").config();
const cors = require("cors");
const MovieBooking = require("./routes/MovieBooking.router");
const LS = require("./routes/LoginSignup.Router");
const HomePage = require("./routes/HomePage.Router");
const Payment = require("./routes/Payment.Router");

const app = express();
const db = require("./configs/db");
app.use(express.json());
app.use(cors());

app.use("/booking", MovieBooking);
app.use("/ls", LS);
app.use("/homepage", HomePage);
app.use("/payment", Payment);
app.listen(process.env.port, async () => {
  await db.query("SELECT NOW()", (err, result) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database at", result.rows[0].now);
    }
  });
  console.log("Connected to DB");
  console.log(`Listening at port ${process.env.port}`);
});
