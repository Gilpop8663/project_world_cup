import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';
import { IUser } from 'utils/interface';
import GoogleLoginBtn from './GoogleLoginBtn';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 60px;
  border-bottom: 1.5px solid #7982c9;
  background-color: white;
`;

const LinkHeadText = styled(Link)`
  font-size: 17px;
  font-weight: 600;
  padding: 15px;
  border-radius: 8px;
  color: #a6b1e1;
`;

const HeadText = styled.p`
  font-size: 17px;
  font-weight: 600;
  padding: 15px;
  border-radius: 5px;
  color: #424874;
`;

const HomeImage = styled.img`
  width: 30px;
  height: 30px;
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
      <LinkHeadText to="/">
        <HomeImage src="/images/home.png" />
      </LinkHeadText>
      {Object.keys(userObj).length === 3 ? (
        <LinkHeadText to="/make">월드컵 생성하기</LinkHeadText>
      ) : (
        <HeadText>로그인 하고 월드컵 생성하기</HeadText>
      )}
      {Object.keys(userObj).length === 0 && (
        <GoogleLoginBtn setUserObj={setUserObj} onGoogleLogin={onLoginClick}>
          로그인
        </GoogleLoginBtn>
      )}
      {Object.keys(userObj).length === 3 && (
        <LinkHeadText to="/my-page">마이 페이지</LinkHeadText>
      )}
      {Object.keys(userObj).length === 3 && (
        <GoogleLogout clientId={clientId} onLogoutSuccess={onLogoutClick}>
          로그아웃
        </GoogleLogout>
      )}
    </Container>
  );
}
