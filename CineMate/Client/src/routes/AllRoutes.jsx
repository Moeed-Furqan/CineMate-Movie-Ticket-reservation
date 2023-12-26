import React from "react";
import { Route, Routes } from "react-router-dom";
import MoviePage from "../Pages/MovieBooking/MoviePage";
import Login from "../Pages/login/login";
import HomePage from "../Pages/Homepage/HomePage";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/booking" element={<MoviePage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
