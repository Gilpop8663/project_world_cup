import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 30vw;
  justify-content: space-between;
  padding: 30px;
`;

export default function Header() {
  return (
    <Container>
      <Link to="/">홈</Link>
      <Link to="/result">결과 보기</Link>
      <Link to="/login">로그인</Link>
      <Link to="/sign-up">회원가입</Link>
    </Container>
  );
}
