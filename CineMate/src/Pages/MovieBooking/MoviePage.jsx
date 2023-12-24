// MoviePage.js
import React from "react";
import "./MoviePage.css";
import { useState } from "react";
import backGround from "../../assets/Jumanji2.jpeg";

const MoviePage = () => {
  const movie = {
    title: "Jumanji",
    content: {
      director: "Jake Kasdan, Joe Johnston",
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
  };
  const initData = {
    date: "",
    day: "",
    time: "",
    dimension: "",
    isBooked: [],
  };

  const [formValue, setFormValue] = useState(initData);
  const [day, setDay] = useState({
    date: "",
    day: "",
    times: [
      { time: "", dimension: "", isBooked: [] },
      { time: "", dimension: "", isBooked: [] },
    ],
  });

  const seats = [];
  const arrayLength = 101;
  function generateRandomArray() {
    return Array.from({ length: 101 }, () => (Math.random() < 0.5 ? 0 : 2));
  }

  movie.bookingDetails[0].times[0].isBooked = generateRandomArray();
  movie.bookingDetails[0].times[1].isBooked = generateRandomArray();
  movie.bookingDetails[1].times[0].isBooked = generateRandomArray();
  movie.bookingDetails[1].times[1].isBooked = generateRandomArray();
  console.log(movie.bookingDetails);

  const [seatBooked, setSeatBooked] = useState([]);
  const seatsArray = Array.from({ length: 101 }, (_, index) => index + 1);

  const handleClick = (e) => {
    const tempArray = formValue.isBooked;
    console.log(e.target.value);
    formValue.isBooked[e.target.value] !== 2
      ? formValue.isBooked[e.target.value] === 0
        ? ((tempArray[e.target.value] = 1),
          setSeatBooked([...seatBooked, e.target.value]))
        : ((tempArray[e.target.value] = 0),
          setSeatBooked(seatBooked.filter((seat) => seat !== e.target.value)))
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
    setIsBooked(booked.isBooked);
  };
  console.log(formValue.isBooked);
  return (
    <>
      <div class="Booking_tickets">
        <div class="right">
          <div className="contentImage"></div>
          <div className="play">
            <i className="bi bi-play-fill" id="play"></i>
          </div>
          <div className="content">
            <h4> Directors</h4>
            <p> Jake Kasdan, Joe Johnston</p>
            <h4>Film Category</h4>
            <p>fantasy adventure comedy</p>
          </div>
        </div>

        <div className="left">
          <div className="bg-img">
            <div className="header">
              <h1>{movie.title}</h1>
              <div className="time">
                <h6>
                  <i className="bi bi-clock"></i>
                  {movie.content.length} minutes
                </h6>
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
                <h6 className="r_title">Show Time</h6>
                <div className="card">
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

            <button className="Next">
              <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
          {/* <!-- <div class="Video_player">
        <video src="videos\JUMANJI_ WELCOME TO THE JUNGLE - Official Trailer (HD).mp4" id="video"
            autoplay></video>
    </div> --> */}
        </div>
      </div>
    </>
  );
};

export default MoviePage;
