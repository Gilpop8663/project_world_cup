import React from 'react';
import styled, { keyframes } from 'styled-components';
const ModalContent = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 0.5s linear infinite;
  transform: translateZ(0);

  border-top: 4px solid white;
  border-right: 4px solid white;
  border-bottom: 4px solid #424874;
  border-left: 4px solid #424874;
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default function Loading() {
  return (
    <ModalContent>
      <Spinner />
    </ModalContent>
  );
}
