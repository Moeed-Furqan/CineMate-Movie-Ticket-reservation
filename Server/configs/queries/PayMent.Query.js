const getShow_Id = `SELECT Show_Id
FROM shows
WHERE Movie_id = $1
    AND EXTRACT(
        DAY
        FROM Show_Date
    ) = $2
    AND EXTRACT(
        HOUR
        FROM Showtime
    ) || ':' || EXTRACT(
        MINUTE
        FROM Showtime
    ) = $3;`;
const markBookSeats = `UPDATE seats_remaining
SET isBooked = $1::INT []
WHERE Show_Id = $2;`;
const getUser_Id = `SELECT Web_user_ID from web_user where Email_ID = $1;`;
const makeBooking = `INSERT INTO booking (No_Of_Tickets, Total_cost, User_ID, shows_Show_Id)
VALUES ($1, $2, $3, $4);`;
module.exports = { getShow_Id, markBookSeats, getUser_Id, makeBooking };
