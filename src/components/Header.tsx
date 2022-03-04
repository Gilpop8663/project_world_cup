import { authService } from '../firebase';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 30vw;
  justify-content: space-between;
  padding: 30px;
`;

interface IHeader {
  isLoggedIn: boolean;
}

const Logout = styled.div``;

export default function Header({ isLoggedIn }: IHeader) {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    authService.signOut();
    navigate('/');
  };
  return (
    <Container>
      <Link to="/">홈</Link>
      <Link to="/result">결과 보기</Link>
      {!isLoggedIn && <Link to="/login">로그인</Link>}
      {!isLoggedIn && <Link to="/sign-up">회원가입</Link>}
      {isLoggedIn && <Logout onClick={onLogoutClick}>로그아웃</Logout>}
    </Container>
  );
}
