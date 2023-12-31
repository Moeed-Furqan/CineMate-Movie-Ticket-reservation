const dbhelper = require("../configs/dbhelper");

const movieData = require("../configs/queries/HomePage.Query");

const getMovieData = async () => {
  return dbhelper.query(movieData, []).then((result) => {
    console.log(result, "in db helper");

    return result;
  });
};

module.exports = getMovieData;
