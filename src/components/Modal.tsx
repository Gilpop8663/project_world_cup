import styled from 'styled-components';
import React from 'react';
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
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 70%;
  height: 70%;
  border-radius: 20px;
  background: white;
`;
export default function Modal({ winner, resultId }: any) {
  const navigate = useNavigate();

  const goToResult = () => {
    navigate(`/ranking/${resultId}`);
  };

  return (
    <ModalBox>
      <Overlay />
      <ModalContent>
        <p>{winner[0].candidate} 우승!!</p>
        <p onClick={goToResult}>랭킹 보러 가기</p>
      </ModalContent>
    </ModalBox>
  );
}
