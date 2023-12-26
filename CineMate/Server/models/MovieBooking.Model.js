const db = require("../configs/db");
const dbhelper = require("../configs/dbhelper");

const { movieQuery } = require("../configs/queries/MovieBooking.Query");

const movieBookingModel = (ID) => {
  console.log("id received:", ID);
  return dbhelper.query(movieQuery, [ID]).then((result) => {
    // console.log(result, "in db helper");
    return result;
  });
};
module.exports = {
  movieBookingModel,
};
// const getAdminCredsFromEmail = (email) => {
//   console.log("email received:", email);
//   return dbhelper.query(getCredsWithEmailQuery, [email]).then((result) => {
//     console.log(result, "in db helper");
//     return result;
//   });
// };

// const countAdmin = () => {
//   return dbhelper.query(countAdminQuery, []).then((result) => {
//     console.log(result, "in db helper");
//     return result[0];
//   });
// };

// const findIfExists = (email) => {
//   console.log("email received to db:", email);
//   return dbhelper.query(findIfExistsQuery, [email]).then((result) => {
//     console.log(result, "in db helper");
//     return result;
//   });
// };

// const addAdmin = (admin) => {
//   console.log("admin received:", admin);
//   const array = Object.values(admin);
//   console.log(array);
//   return dbhelper.query(addQuery, array).then((result) => {
//     console.log("admin added successfully");
//     return result;
//   });
// };

// const deleteAdmin = (email) => {
//   console.log("admin email received:", email);
//   return dbhelper.query(deleteRow, [email]).then((result) => {
//     console.log(result, "in db helper");
//     return result;
//   });
// };
// module.exports = {
//   findIfExists,
//   AdminCredModel,
//   createTables,
//   findCred,
//   addAdmin,
//   getAdminCredsFromEmail,
//   deleteAdmin,
//   countAdmin,
// };
