import Header from 'components/Header';
import Home from 'pages/home/Home';
import Login from 'pages/login/Login';
import Result from 'pages/result/Result';
import SignUp from 'pages/signUp/SignUp';
import WorldCup from 'pages/worldCup/WorldCup';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

interface IRouter {
  isLoggedIn: boolean;
  userObj: object | null;
}

export default function Router({ userObj, isLoggedIn }: IRouter) {
  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
