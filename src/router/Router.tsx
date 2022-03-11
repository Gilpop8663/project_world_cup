import Header from 'components/Header';
import Home from 'pages/home/Home';
import MakeWorldCup from 'pages/makeWorldCup/MakeWorldCup';
import MyPage from 'pages/myPage/MyPage';
import Ranking from 'pages/ranking/Ranking';
import Result from 'pages/result/Result';
import WorldCup from 'pages/worldCup/WorldCup';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IUserObj } from 'utils/interface';

interface IRouterProps {
  userObj: IUserObj;
  setUserObj: React.Dispatch<React.SetStateAction<{}>>;
}

export default function Router({ userObj, setUserObj }: IRouterProps) {
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
        <Route path="/make" element={<MakeWorldCup userObj={userObj} />} />
        <Route path="/my-page" element={<MyPage userObj={userObj} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
