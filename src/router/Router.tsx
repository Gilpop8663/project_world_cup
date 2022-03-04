import Header from 'components/Header';
import Home from 'pages/home/Home';
import Login from 'pages/login/Login';
import Result from 'pages/result/Result';
import SignUp from 'pages/signUp/SignUp';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

interface IRouter {
  isLoggedIn: any;
}

export default function Router({ isLoggedIn }: IRouter) {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
