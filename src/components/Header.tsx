import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';
import { IUser } from 'utils/interface';
import GoogleLoginBtn from './GoogleLoginBtn';

const Container = styled.div`
  display: flex;
  width: 30vw;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const clientId =
  '586282779729-89d3k141i3b637fm739kvc5odonnmgm3.apps.googleusercontent.com';

export default function Header({ setUserObj, userObj }: IUser) {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    console.log('로그아웃 성공');
    setUserObj({});
    navigate('/');
  };
  const onLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('로그인 클릭');
    navigate('/');
  };
  return (
    <Container>
      <Link to="/">홈</Link>
      {Object.keys(userObj).length === 3 && (
        <Link to="/make">월드컵 생성하기</Link>
      )}
      {Object.keys(userObj).length === 0 && (
        <GoogleLoginBtn setUserObj={setUserObj} onGoogleLogin={onLoginClick}>
          로그인
        </GoogleLoginBtn>
      )}
      {Object.keys(userObj).length === 3 && (
        <GoogleLogout clientId={clientId} onLogoutSuccess={onLogoutClick}>
          로그아웃
        </GoogleLogout>
      )}
    </Container>
  );
}
