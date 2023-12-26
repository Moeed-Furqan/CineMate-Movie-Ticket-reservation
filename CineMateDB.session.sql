SELECT Show_Id,
    TO_CHAR(Showtime, 'HH:MI') AS formatted_time,
    Show_Date,
    Show_Type,
    Movie_id,
    show_day
FROM shows;
-- SELECT m.MovieName as title,
--     m.Director as director,
--     m.Description as category,
--     m.total_time as length,
--     CASE
--         WHEN m.pg_rating = 13 THEN 'PG-13' -- Add more cases for other ratings if needed
--     END as rating,
--     EXTRACT(
--         DAY
--         FROM s.Show_Date
--     ) as date,
--     s.show_day as day,
--     s.Showtime as time,
--     s.Show_Type as dimension,
--     sr.isBooked
-- FROM movie m
--     JOIN shows s ON m.Movie_id = s.Movie_id
--     JOIN seats_remaining sr ON s.Show_Id = sr.Show_Id
-- WHERE m.Movie_id = '1'
-- ORDER BY s.Show_Date,
--     s.Showtime;
-- INSERT INTO movie (
--         Movie_id,
--         MovieName,
--         Director,
--         Description,
--         pg_rating,
--         total_time,
--         status,
--         images
--     )
-- VALUES (
--         '1',
--         -- replace with an appropriate Movie_id value
--         'Jumanji',
--         -- replace with an appropriate MovieName value
--         'Jake Kasdan, Joe Johnston',
--         'Action, Adventure, Comedy',
--         13,
--         119,
--         TRUE,
--         -- or FALSE, depending on the status
--         ARRAY ['../../assets/Jumanji.jpeg', '../../assets/Jumanji.jpg'] -- replace with actual image file names
--     );
-- -- INSERT INTO shows (
-- --         Show_Id,
-- --         Showtime,
-- --         Show_Date,
-- --         Show_Type,
-- --         Movie_id
-- --     )
-- -- VALUES ('show1', '10:00', '22', '3D', '1'),
-- --     ('show2', '12:00', '2023-01-22', '2D', '1'),
-- --     ('show3', '9:00', '2023-01-23', '2D', '1'),
-- --     ('show4', '13:00', '2023-01-23', '2D', '1');
-- Adding records to the seats_remaining table with isBooked arrays containing only 0 and 2
-- Adding records to the seats_remaining table with isBooked arrays containing only 0 and 2
-- Inserting data into the shows table
-- INSERT INTO shows (
--         Show_Id,
--         Showtime,
--         Show_Date,
--         Show_Type,
--         Movie_id,
--         show_day
--     )
-- VALUES ('show1', '10:00', '2023-12-22', '3D', '1', 'Mon'),
--     ('show2', '12:00', '2023-12-22', '2D', '1', 'Mon'),
--     ('show3', '9:00', '2023-12-23', '2D', '1', 'Tue'),
--     ('show4', '13:00', '2023-12-23', '2D', '1', 'Tue');
-- INSERT INTO seats_remaining (Show_Id, isBooked)
-- VALUES (
--         'show1',
--         ARRAY(
--             SELECT CASE
--                     WHEN random() < 0.5 THEN 0
--                     ELSE 2
--                 END
--             FROM generate_series(1, 101)
--         )
--     ),
--     (
--         'show2',
--         ARRAY(
--             SELECT CASE
--                     WHEN random() < 0.5 THEN 0
--                     ELSE 2
--                 END
--             FROM generate_series(1, 101)
--         )
--     ),
--     (
--         'show3',
--         ARRAY(
--             SELECT CASE
--                     WHEN random() < 0.5 THEN 0
--                     ELSE 2
--                 END
--             FROM generate_series(1, 101)
--         )
--     ),
--     (
--         'show4',
--         ARRAY(
--             SELECT CASE
--                     WHEN random() < 0.5 THEN 0
--                     ELSE 2
--                 END
--             FROM generate_series(1, 101)
--         )
--     );