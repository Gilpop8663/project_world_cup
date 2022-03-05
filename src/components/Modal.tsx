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
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 70%;
  height: 70%;

  border-radius: 20px;
  background: white;
`;

const WinnerText = styled.h1`
  font-size: 6.5vw;
  text-align: center;
  color: black;

  .char,
  .word {
    display: inline-block;
  }

  .splitting .char {
    animation: slide-in 1s cubic-bezier(0.17, 0.84, 0.4, 1.49) both;
    animation-delay: calc(30ms * var(--char-index));
  }

  [data-word='🏆'] .char {
    display: inline;
  }
  .splitting [data-word='🏆'] {
    animation: bump-in 1s cubic-bezier(0.17, 0.84, 0.4, 1.49) both;
    animation-delay: 1s;
  }

  @keyframes slide-in {
    0% {
      transform: scale(2) rotate(60deg);
      opacity: 0;
    }
  }
  @keyframes bump-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
  }

  .particule {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    box-shadow: 1px 1px 4px #eb6383;
  }
`;
export default function Modal({ winner, resultId }: any) {
  const navigate = useNavigate();

  const goToResult = () => {
    navigate(`/world/${resultId}/result`);
  };

  let particles: any = [];
  const colors = ['#eb6383', '#fa9191', '#ffe9c5', '#b4f2e1'];
  function pop() {
    for (let i = 0; i < 150; i++) {
      const p: any = document.createElement('particule');
      p.x = window.innerWidth * 0.5;
      p.y = window.innerHeight + Math.random() * window.innerHeight * 0.3;
      p.vel = {
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * -20 - 15,
      };
      p.mass = Math.random() * 0.2 + 0.8;
      particles.push(p);
      p.style.transform = `translate(${p.x}px, ${p.y}px)`;
      const size = Math.random() * 15 + 5;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(p);
    }
  }

  function render() {
    for (let i = particles.length - 1; i--; i > -1) {
      const p = particles[i];
      p.style.transform = `translate3d(${p.x}px, ${p.y}px, 1px)`;

      p.x += p.vel.x;
      p.y += p.vel.y;

      p.vel.y += 0.5 * p.mass;
      if (p.y > window.innerHeight * 2) {
        p.remove();
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(render);
  }
  useEffect(() => {
    pop();
    window.setTimeout(render, 700);
    window.addEventListener('click', pop);
    console.log('실행이 다 외엇음');
  }, []);
  return (
    <ModalBox>
      <Overlay />
      <ModalContent>
        <WinnerText data-splitting>
          우승자는 {winner[0].candidate}입니다!!!
        </WinnerText>
        <span>🏆</span>

        <p onClick={goToResult}>랭킹 보러 가기</p>
      </ModalContent>
    </ModalBox>
  );
}
