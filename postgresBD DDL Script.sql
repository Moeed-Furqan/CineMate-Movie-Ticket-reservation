-- Table web_user
CREATE TABLE IF NOT EXISTS web_user (
  Web_user_ID SERIAL PRIMARY KEY,
  Email_ID VARCHAR(30),
  password VARCHAR(30)
);
-- Table movie
-- Table ticket
CREATE TABLE IF NOT EXISTS booking (
  Booking_ID Serial NOT NULL,
  No_Of_Tickets INT,
  Total_cost INT,
  User_ID SERIAL,
  -------------------------------
  shows_Show_Id int,
  PRIMARY KEY (Booking_ID),
  FOREIGN KEY (User_ID) REFERENCES web_user (Web_user_ID),
  FOREIGN KEY (shows_Show_Id) REFERENCES shows (Show_Id)
);
CREATE TABLE IF NOT EXISTS ticket (
  Ticket_id VARCHAR(8) NOT NULL,
  Booking_ID VARCHAR(5),
  Class VARCHAR(3),
  Silver_price INT,
  Gold_price INT,
  PRIMARY KEY (Ticket_id),
  FOREIGN KEY (Booking_ID) REFERENCES booking (Booking_ID)
);
-- Table payment
-- Table seats_remaining
CREATE TABLE IF NOT EXISTS seats_remaining (
  Show_Id SERIAL NOT NULL,
  isBooked INT [],
  PRIMARY KEY (Show_Id),
  ------------------------------------------
  FOREIGN KEY (Show_Id) REFERENCES shows (Show_Id)
);
CREATE TABLE IF NOT EXISTS movie (
  Movie_id serial NOT NULL,
  MovieName VARCHAR(60),
  Director VARCHAR(50),
  Description VARCHAR(100),
  pg_rating INT,
  total_time INT,
  status BOOLEAN,
  -------------------------------
  images VARCHAR(60) [],
  PRIMARY KEY (Movie_id)
);
-- Table shows
CREATE TABLE IF NOT EXISTS shows (
  Show_Id SERIAL NOT NULL,
  Showtime TIME,
  Show_Date DATE,
  -----------------------------------
  Show_Type VARCHAR(3),
  Movie_id int,
  show_day VARCHAR(5),
  PRIMARY KEY (Show_Id),
  FOREIGN KEY (Movie_id) REFERENCES movie (Movie_id)
);
CREATE TABLE IF NOT EXISTS payment (
  CardNumber VARCHAR(16),
  CVV VARCHAR(3),
  Total_cost INT NOT NULL,
  User_ID SERIAL,
  FOREIGN KEY (User_ID) REFERENCES web_user (Web_user_ID)
);