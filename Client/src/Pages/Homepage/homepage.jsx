import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./homepage.css";
import axios from "axios";
import { Card } from "antd";
const { Meta } = Card;

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cred = location.state;
  console.log(cred);
  const fetchData = async () => {
    try {
      const backendUrl = "http://localhost:8000/homepage/";
      const response = await axios.get(backendUrl);
      console.log(response);
      setMovieData(response.data);
      console.log(moviesData);
      // ... (other data processing logic)
    } catch (error) {
      console.error("Error making Get request:", error);
    }
  };

  const [moviesData, setMovieData] = useState([
    {
      Movie_id: "11",
      MovieName: "Jumanji",
      Director: "Jake Kasdan, Joe Johnston",
      Description:
        "Four teenagers in detention discover an old video game console with a game they've never heard of. When they decide to play, they are immediately sucked into the jungle world of Jumanji in the bodies of their avatars (Dwayne Johnson, Jack Black, Kevin Hart, and Karen Gillan)",
      pg_rating: 13,
      total_time: 119,
      status: true,
      images: [
        "../../../public/assets/Jumanji2.jpeg",
        "../../../public/assets/Jumanji.jpg",
      ],
    },
  ]);

  useEffect(() => {
    // console.log("2");
    fetchData().then(() => {
      console.log("waiting");
    });
    console.log("fetch data called");
  }, []);
  function createMovieCard(movie) {
    // console.log(movie.Movie_id, movie.movie_id);
    return (
      <div
        className="movie-card"
        onClick={() => (window.location.href = "login.html")}
      >
        <a href="">
          <div className="movie-image-container">
            <img
              src={movie.images[0]}
              alt={movie.MovieName}
              className="movie-image"
            />
            <div className="movie-overlay">{movie.MovieName}</div>
          </div>
        </a>
      </div>
    );
  }
  const moveToBookingPage = (e) => {
    console.log("Id must be", e.currentTarget.id);
    cred == null
      ? navigate("/")
      : navigate("/booking", {
          state: {
            username: cred,
            id: e.currentTarget.id,
          },
        });
  };
  function createMovieCard_slider(movie) {
    return (
      <div
        className="movie-card slider2"
        id={movie.movie_id}
        onClick={moveToBookingPage}
      >
        <div className="movie-image-container" style={{ cursor: "pointer" }}>
          <img
            src={movie.images[0]}
            alt={movie.MovieName}
            className="movie-image slider-image"
          />
          <div className="movie-overlay slider">{movie.movieName}</div>
        </div>
      </div>
    );
  }
  const logOut = () => {
    navigate("/");
  };
  return (
    <div className="background">
      <div className="navbar">
        <div className="logo">
          <h1>Cinemate</h1>
        </div>
        <div
          className="nav-links"
          style={{ cursor: "pointer", fontSize: "larger" }}
          onClick={logOut}
        >
          Logout
        </div>
      </div>

      <h2 className="upcoming-heading">Upcoming Movies</h2>
      <div className="movies-section" id="upcomingMoviesSection">
        {moviesData
          .filter((movie) => !movie.status)
          .map((movie) => createMovieCard(movie))}
      </div>

      <h2 className="now-showing-heading">Now Showing</h2>
      <div class="slider-container">
        <div className="movies-slider" id="nowShowingMoviesSection">
          {moviesData
            .filter((movie) => movie.status)
            .map((movie) => createMovieCard_slider(movie))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
