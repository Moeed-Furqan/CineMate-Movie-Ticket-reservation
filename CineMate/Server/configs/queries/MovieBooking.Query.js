const movieQuery = `
SELECT m.MovieName as title,
m.Director as director,
m.Description as category,
m.total_time as length,
CASE
    WHEN m.pg_rating = 13 THEN 'PG-13' -- Add more cases for other ratings if needed
END as rating,
EXTRACT(
    DAY
    FROM s.Show_Date
) as date,
s.show_day as day,
TO_CHAR(Showtime, 'HH:MI') as time,
s.Show_Type as dimension,
sr.isBooked
FROM movie m
JOIN shows s ON m.Movie_id = s.Movie_id
JOIN seats_remaining sr ON s.Show_Id = sr.Show_Id
WHERE m.Movie_id = $1
ORDER BY s.Show_Date,
s.Showtime;
    `;

module.exports = {
  movieQuery,
};
