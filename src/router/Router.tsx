import Header from 'components/Header';
import Home from 'pages/home/Home';
import MakeWorldCup from 'pages/makeWorldCup/MakeWorldCup';
import Ranking from 'pages/ranking/Ranking';
import Result from 'pages/result/Result';
import WorldCup from 'pages/worldCup/WorldCup';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IUser } from 'utils/interface';

export default function Router({ userObj, setUserObj }: IUser) {
  return (
    <BrowserRouter>
      <Header setUserObj={setUserObj} userObj={userObj} />
      <Routes>
        <Route
          path="/world/:id/result"
          element={<Result userObj={userObj} />}
        />
        <Route path="/world/:id" element={<WorldCup />} />
        <Route path="/ranking/:id" element={<Ranking />} />
        <Route path="/make" element={<MakeWorldCup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
