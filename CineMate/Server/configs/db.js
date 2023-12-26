const { Pool } = require("pg");

// Replace these values with your PostgreSQL connection details
const pool = new Pool({
  user: "postgres",
  database: "cinemate",
  password: "root123",
  port: 5432, // PostgreSQL default port
});

// Simple query example
// module.exports = { pool };

// async function getMovieDetails() {
//   try {
//     let movieId = "'1'"; // Replace with the desired Movie_id

//     // Query to retrieve movie details for a specific Movie_id
//     const movieQuery = `
// SELECT
//   m.MovieName as title,
//   m.Director as director,
//   m.Description as category,
//   m.total_time as length,
//   CASE
//     WHEN m.pg_rating = 13 THEN 'PG-13'
//     -- Add more cases for other ratings if needed
//   END as rating,
//   EXTRACT(DAY FROM s.Show_Date) as date,
//   s.show_day as day,
//   s.Showtime as time,
//   s.Show_Type as dimension,
//   sr.isBooked
// FROM movie m
// JOIN shows s ON m.Movie_id = s.Movie_id
// JOIN seats_remaining sr ON s.Show_Id = sr.Show_Id
// WHERE m.Movie_id = $1
// ORDER BY s.Show_Date, s.Showtime;
//     `;

//     // Execute the query
//     const result = await pool.query(movieQuery);

//     // Format the result into the desired structure
// const movie = {
//   title: result.rows[0].title,
//   content: {
//     director: result.rows[0].director,
//     category: result.rows[0].category,
//     length: result.rows[0].length,
//     rating: result.rows[0].rating,
//   },
//   bookingDetails: [],
// };

// // Iterate through the result rows to organize booking details
// result.rows.forEach((row) => {
//   // Check if a new date entry is needed in the movie object
//   const dateEntry = movie.bookingDetails.find(
//     (entry) => entry.date === row.date
//   );
//   if (!dateEntry) {
//     const newDateEntry = {
//       date: row.date,
//       day: row.day,
//       times: [],
//     };
//     movie.bookingDetails.push(newDateEntry);
//   }

//   // Add the show details to the corresponding date entry
//   const timeEntry = {
//     time: row.time,
//     dimension: row.dimension,
//     isBooked: row.isbooked,
//   };

//   const dateIndex = movie.bookingDetails.findIndex(
//     (entry) => entry.date === row.date
//   );
//   movie.bookingDetails[dateIndex].times.push(timeEntry);
// });

// // Log the formatted movie object
// console.log(movie);
//   } catch (error) {
//     console.error("Error fetching movie details:", error);
//   } finally {
//     // Close the database connection pool
//     await pool.end();
//   }
// }

// // Call the function to get movie details
// getMovieDetails();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
