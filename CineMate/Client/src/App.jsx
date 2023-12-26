import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import MoviePage from "./Pages/MovieBooking/MoviePage";
import "./App.css";
import Login from "./Pages/login/login";
import MoviePage from "./Pages/MovieBooking/MoviePage";
import HomePage from "./Pages/Homepage/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MoviePage />
    </>
  );
}

export default App;
