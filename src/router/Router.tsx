import Header from 'components/Header';
import Home from 'pages/home/Home';
import Login from 'pages/login/Login';
import MakeWorldCup from 'pages/makeWorldCup/MakeWorldCup';
import Ranking from 'pages/ranking/Ranking';
import Result from 'pages/result/Result';
import SignUp from 'pages/signUp/SignUp';
import ViewWorldCup from 'pages/viewWolrdCup/ViewWorldCup';
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
        <Route path="/world/:id" element={<WorldCup />} />
        <Route path="/view" element={<ViewWorldCup />} />
        {/* <Route path="/result" element={<Result userObj={userObj} />} /> */}
        <Route path="/result/:id" element={<Ranking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/make" element={<MakeWorldCup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
