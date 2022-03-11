import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalBox = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000;
  opacity: 0.5;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  padding: 20px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 70%;
  height: 70%;
  border-radius: 14px;
  border: 2px solid #7982c9;
  background: white;
  @media screen and (max-width: 1024px) {
    height: 45%;
  }
  @media screen and (max-width: 768px) {
    height: 25%;
  }
`;

const WinnerText = styled.h1`
  font-size: 50px;
  text-align: center;
  font-weight: 800;
  color: #424874;
  margin-bottom: 40px;
  @media screen and (max-width: 1024px) {
    font-size: 36px;
  }
  @media screen and (max-width: 768px) {
    font-size: 23px;
  }
`;

const GoRankingText = styled.div`
  padding: 15px;
  font-size: 30px;
  text-align: center;
  font-weight: 600;
  background-color: #424874;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: 30px;
  }
  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
`;

export default function Modal({ winner, resultId }: any) {
  const navigate = useNavigate();

  const goToResult = () => {
    navigate(`/world/${resultId}/result`);
  };

  return (
    <ModalBox>
      <Overlay />
      <ModalContent>
        <WinnerText data-splitting>
          🥳 우승자는 {winner[0].candidate} 입니다! 🎉
        </WinnerText>

        <GoRankingText onClick={goToResult}>🏆 랭킹 보러 가기</GoRankingText>
      </ModalContent>
    </ModalBox>
  );
}
