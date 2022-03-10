import React from 'react';
import styled, { keyframes } from 'styled-components';
const Ani = keyframes`
0% {
    
    background-color: green;
}
    100%{
        background-color: red;
        
    }
    `;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid red;
  animation: Ani 5s ease;
`;

export default function Loading() {
  return <Spinner></Spinner>;
}
