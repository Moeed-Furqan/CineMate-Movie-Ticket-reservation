import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/login/Login";
import MovieBook from "../Pages/MovieBook/MovieBook";
import PaymentForm from "../Pages/payment/Payment";
import HomePage from "../Pages/Homepage/homepage";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route path="/booking" element={<MovieBook />} />
        <Route path="/payment" element={<PaymentForm />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
