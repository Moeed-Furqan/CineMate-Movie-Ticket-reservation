// MoviePage.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MovieBook.css";
import { useState } from "react";
import axios from "axios";
const MovieBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ID = location.state.id;
  console.log(ID);
  const [sideImageUrl, setSideImageUrl] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [hasBookedSeat, setHasBookedSeat] = useState(false);
  const fetchData = async () => {
    try {
      const backendUrl = "http://localhost:8000/booking/";
      const data = { id: ID };
      const response = await axios.post(backendUrl, data);
      console.log(response);
      setMovie(response.data);
      console.log(movie);
      // ... (other data processing logic)
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const [movie, setMovie] = useState({
    title: "Jumanji",
    images: ["..", "i.jpg"],
    content: {
      director: "Arbi",
      category: "fantasy adventure comedy",
      length: 165,
      rating: "PG-13",
    },

    bookingDetails: [
      {
        date: "22",
        day: "Mon",
        times: [
          { time: "10:00", dimension: "3D", isBooked: [] },
          { time: "12:00", dimension: "2D", isBooked: [] },
        ],
      },
      {
        date: "23",
        day: "Tue",
        times: [
          { time: "9:00", dimension: "2D", isBooked: [] },
          { time: "1:00", dimension: "2D", isBooked: [] },
        ],
      },
    ],
  });

  useEffect(() => {
    // console.log("2");
    fetchData().then(() => {
      console.log("waiting");
    });
    console.log("fetch data called");
  }, []);
  const initData = {
    date: "",
    day: "",
    time: "",
    dimension: "",
    isBooked: [],
  };
  useEffect(() => {
    // Update background image when movie changes
    // setBackgroundUrl(movie.images[1]);
    setSideImageUrl(movie.images[0]);
  }, [movie]);

  const [formValue, setFormValue] = useState(initData);
  const [day, setDay] = useState({
    date: "",
    day: "",
    times: [
      { time: "", dimension: "", isBooked: [] },
      { time: "", dimension: "", isBooked: [] },
    ],
  });

  const [seatBooked, setSeatBooked] = useState([]);

  const seatsArray = Array.from({ length: 101 }, (_, index) => index + 1);

  const handleClick = (e) => {
    const tempArray = formValue.isBooked;
    console.log(hasBookedSeat, "before formvalue");
    console.log(hasBookedSeat, "After formvalue");
    console.log(e.target.value);
    formValue.isBooked[e.target.value] !== 2
      ? formValue.isBooked[e.target.value] === 0
        ? ((tempArray[e.target.value] = 1),
          setSeatBooked([...seatBooked, e.target.value]),
          setHasBookedSeat(true))
        : ((tempArray[e.target.value] = 0),
          setSeatBooked(seatBooked.filter((seat) => seat !== e.target.value)),
          setHasBookedSeat(formValue.isBooked.some((value) => value === 1)))
      : null;
    console.log("temp", tempArray);
    setFormValue({ ...formValue, isBooked: tempArray });
  };

  const handleDayChange = (value) => {
    setFormValue({
      ...formValue,
      day: value.day,
      date: value.date,
      time: "",
      isBooked: [],
    });
    const temp = movie.bookingDetails.find((object) => {
      return object.date === value.date && object.day === value.day;
    });
    setDay(temp);
  };

  const handleTimeChange = (value) => {
    const booked = day.times.find((object) => {
      return value.time === object.time && value.dimension === object.dimension;
    });
    setFormValue({
      ...formValue,
      time: booked.time,
      dimension: booked.dimension,
      isBooked: booked.isBooked,
    });
    console.log(booked);
  };
  const handleCheckoutClick = (e) => {
    const selectedSeatIndexes = formValue.isBooked.reduce(
      (acc, value, index) => {
        if (value === 1) {
          acc.push(index);
        }
        return acc;
      },
      []
    );
    console.log(selectedSeatIndexes);
    navigate("/payment", {
      state: {
        seats: selectedSeatIndexes,
        username: location.state.username,
        time: formValue.time,
        date: formValue.date,
        movieId: ID,
        arrayBooking: formValue.isBooked,
        tickets: selectedSeatIndexes.length,
      },
    });
  };
  useEffect(() => {
    setHasBookedSeat(false);
  }, [formValue.date, formValue.time]);
  console.log(formValue);

  return (
    <>
      {movie && (
        <div class="Booking_tickets">
          <div class="right">
            <div
              className="contentImage"
              style={{
                background: `url(${sideImageUrl})`,
              }}
            ></div>
            <div className="content">
              <h3> Directors</h3>
              <p> {movie.content.director}</p>
              <h3>Film Category</h3>
              <p>{movie.content.category}</p>
            </div>
          </div>

          <div className="left">
            <div
              className="bg-img"
              style={{
                backgroundImage: `url(${backgroundUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100%",
                minHeight: "75vh",
                borderRadius: "20px",
              }}
            >
              {/* Your other content goes here */}
              <div className="header">
                <h1>{movie.title}</h1>
                <div className="time">
                  <h6>{movie.content.length} minutes</h6>
                  <button>{movie.content.rating}</button>
                </div>
              </div>
              <div className="date_type">
                <div className="left_card">
                  <div className="month">
                    {movie.bookingDetails.map((detail) => (
                      <li
                        className={
                          !(
                            formValue.date === detail.date &&
                            formValue.day === detail.day
                          )
                            ? ""
                            : "selected"
                        }
                        onClick={() => {
                          handleDayChange(detail);
                        }}
                      >
                        <h6>{detail.day}</h6>
                        <h6>{detail.date}</h6>
                      </li>
                    ))}
                  </div>
                </div>
                <div className="right_card">
                  <h4 className="r_title">Show Time</h4>
                  <div className="Card">
                    {movie.bookingDetails.map((detail) =>
                      detail.date === formValue.date &&
                      detail.day === formValue.day
                        ? detail.times.map((object) => (
                            <li
                              className={
                                !(formValue.time === object.time)
                                  ? ""
                                  : "selected"
                              }
                              onClick={() => {
                                handleTimeChange(object);
                              }}
                            >
                              <h6>{object.dimension}</h6>
                              <h6>{object.time}</h6>
                            </li>
                          ))
                        : null
                    )}
                  </div>
                </div>
              </div>

              <div className="Screen">
                Screen
                {formValue.isBooked.length === 0 ? (
                  <div>Choose a Date and Time</div>
                ) : null}
              </div>

              <div className="Chairs">
                {formValue.isBooked.length === 101 ? (
                  <>
                    <div className="row">
                      {seatsArray.map((seatNumber) =>
                        seatNumber < 21 ? (
                          <li
                            className={
                              formValue.isBooked[seatNumber] === 0
                                ? ""
                                : formValue.isBooked[seatNumber] === 1
                                ? "selected"
                                : "booked"
                            }
                            key={seatNumber}
                            value={seatNumber}
                            onClick={handleClick}
                          >
                            {seatNumber}
                          </li>
                        ) : null
                      )}
                    </div>
                    <div className="row">
                      {seatsArray.map((seatNumber) =>
                        seatNumber > 20 && seatNumber < 41 ? (
                          <li
                            className={
                              formValue.isBooked[seatNumber] === 0
                                ? ""
                                : formValue.isBooked[seatNumber] === 1
                                ? "selected"
                                : "booked"
                            }
                            key={seatNumber}
                            value={seatNumber}
                            onClick={handleClick}
                          >
                            {seatNumber}
                          </li>
                        ) : null
                      )}
                    </div>
                    <div className="row">
                      {seatsArray.map((seatNumber) =>
                        seatNumber > 40 && seatNumber < 61 ? (
                          <li
                            className={
                              formValue.isBooked[seatNumber] === 0
                                ? ""
                                : formValue.isBooked[seatNumber] === 1
                                ? "selected"
                                : "booked"
                            }
                            key={seatNumber}
                            value={seatNumber}
                            onClick={handleClick}
                          >
                            {seatNumber}
                          </li>
                        ) : null
                      )}
                    </div>
                    <div className="row">
                      {seatsArray.map((seatNumber) =>
                        seatNumber > 60 && seatNumber < 81 ? (
                          <li
                            className={
                              formValue.isBooked[seatNumber] === 0
                                ? ""
                                : formValue.isBooked[seatNumber] === 1
                                ? "selected"
                                : "booked"
                            }
                            key={seatNumber}
                            value={seatNumber}
                            onClick={handleClick}
                          >
                            {seatNumber}
                          </li>
                        ) : null
                      )}
                    </div>
                    <div className="row row1">
                      {seatsArray.map((seatNumber) =>
                        seatNumber > 80 && seatNumber < 101 ? (
                          <li
                            className={
                              formValue.isBooked[seatNumber] === 0
                                ? ""
                                : formValue.isBooked[seatNumber] === 1
                                ? "selected"
                                : "booked"
                            }
                            key={seatNumber}
                            value={seatNumber}
                            onClick={handleClick}
                          >
                            {seatNumber}
                          </li>
                        ) : null
                      )}
                    </div>
                    <div className="details" id="del">
                      <div className="del_chairs">
                        <li>Available</li>
                        <li>Booked</li>
                        <li>Selected</li>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              <button
                className="Next"
                style={{ display: hasBookedSeat ? "block" : "none" }}
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>
            {/* <!-- <div class="Video_player">
            <video src="videos\JUMANJI_ WELCOME TO THE JUNGLE - Official Trailer (HD).mp4" id="video"
                autoplay></video>
        </div> --> */}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieBook;
