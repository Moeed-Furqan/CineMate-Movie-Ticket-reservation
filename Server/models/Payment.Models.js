const db = require("../configs/db");
const dbhelper = require("../configs/dbhelper");

const {
  getShow_Id,
  markBookSeats,
  getUser_Id,
  makeBooking,
} = require("../configs/queries/PayMent.Query");

const getShowId = async (MovieId, day, time) => {
  console.log("id received:", MovieId);
  console.log("Day:", day);
  console.log("Time:", time);
  return dbhelper.query(getShow_Id, [MovieId, day, time]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

const getUserId = async (username) => {
  console.log("Username :", username);
  return dbhelper.query(getUser_Id, [username]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

const updateSeats = async (stringArray, showId) => {
  console.log("String-Array received:", stringArray);
  console.log("Show Id:", showId);
  return dbhelper.query(markBookSeats, [stringArray, showId]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

const insertBooking = async (tickets, cost, userId, showId) => {
  console.log("booking Table:", tickets, cost, userId, showId);
  return dbhelper
    .query(makeBooking, [tickets, cost, userId, showId])
    .then((result) => {
      console.log(result, "in db helper");
      return result;
    });
};

module.exports = {
  getShowId,
  getUserId,
  updateSeats,
  insertBooking,
};
