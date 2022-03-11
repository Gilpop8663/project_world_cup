import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';
import { IUser } from 'utils/interface';
import GoogleLoginBtn from './GoogleLoginBtn';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1.5px solid #7982c9;
  background-color: white;
  padding: 10px 60px;
  align-items: center;
  @media only screen and (max-width: 768px) {
    padding: 10px 10px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0px;
`;

const LinkHeadText = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  padding: 15px;
  border-radius: 8px;
  color: #a6b1e1;
`;

const HomeLink = styled(LinkHeadText)`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const MyWorldLink = styled(LinkHeadText)`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const MakeLink = styled(LinkHeadText)`
  @media only screen and (max-width: 768px) {
  }
`;
const MobileHomeLink = styled(LinkHeadText)`
  @media only screen and (min-width: 768px) {
    display: none;
    visibility: hidden;
  }
`;

const HeadText = styled.p`
  font-size: 17px;
  font-weight: 600;
  padding: 15px;
  border-radius: 5px;
  color: #424874;
  @media only screen and (max-width: 1024px) {
    font-size: 17px;
  }
  @media only screen and (max-width: 768px) {
    white-space: pre-wrap;
    line-height: 20px;
    font-size: 12px;
  }
`;

const HomeImage = styled.img`
  width: 30px;
  height: 30px;
  @media only screen and (max-width: 1024px) {
    width: 30px;
    height: 30px;
  }
  @media only screen and (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

const HomeTitle = styled.h1`
  font-size: 17px;
  font-weight: 600;
  margin-left: 10px;
  color: #424874;
`;

const Svg = styled.svg`
  width: 25px;
  height: 25px;
  margin-left: 10px;
  fill: #424874;
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    display: none;
    visibility: hidden;
  }
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 998;
  @media only screen and (min-width: 768px) {
    display: none;
    visibility: hidden;
  }
`;

const MobileMenu = styled.div`
  padding: 50px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  width: 280px;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  @media only screen and (min-width: 768px) {
    display: none;
    visibility: hidden;
  }
`;

const MenuConatiner = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (min-width: 768px) {
    display: none;
    visibility: hidden;
  }
`;

const MobileTitle = styled.h1`
  margin-left: 10px;
  font-weight: bold;
  color: #424874;
`;

const LogoutContainer = styled.div`
  margin-right: 10px;
  @media only screen and (max-width: 768px) {
  }
`;

const clientId: any = process.env.REACT_APP_GOOGLE_ID;

const WOLRD_LOGIN = '로그인 하고\n월드컵을 만들어주세요';

export default function Header({ setUserObj, userObj }: IUser) {
  const navigate = useNavigate();
  const [onMenu, setOnMenu] = useState(false);
  const onLogoutClick = () => {
    console.log('로그아웃 성공');
    setUserObj({});
    setOnMenu(false);
    navigate('/');
  };
  const onLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('로그인 클릭');
    setOnMenu(false);
    navigate('/');
  };
  const onMenuClick = () => {
    setOnMenu((prev) => !prev);
  };
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
  }, []);
  return (
    <Container>
      {Object.keys(userObj).length === 3 && (
        <MenuConatiner>
          <Svg
            onClick={onMenuClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
          </Svg>
        </MenuConatiner>
      )}

      {Object.keys(userObj).length === 0 && (
        <MobileHomeLink to="/">
          <HomeImage src="/images/home.png" />
        </MobileHomeLink>
      )}
      <HomeLink to="/">
        <HomeImage src="/images/home.png" />
      </HomeLink>
      {Object.keys(userObj).length === 3 ? (
        <MakeLink to="/make">월드컵 만들기</MakeLink>
      ) : (
        <HeadText>{WOLRD_LOGIN}</HeadText>
      )}
      {Object.keys(userObj).length === 0 && (
        <GoogleLoginBtn setUserObj={setUserObj} onGoogleLogin={onLoginClick}>
          로그인
        </GoogleLoginBtn>
      )}
      {Object.keys(userObj).length === 3 && (
        <MyWorldLink to="/my-page">나의 월드컵</MyWorldLink>
      )}
      {Object.keys(userObj).length === 3 && (
        <LogoutContainer>
          <GoogleLogout clientId={clientId} onLogoutSuccess={onLogoutClick}>
            로그아웃
          </GoogleLogout>
        </LogoutContainer>
      )}
      {onMenu && (
        <>
          <Overlay onClick={onMenuClick} />
          <MobileMenu>
            <LinkHeadText onClick={onMenuClick} to="/">
              <HomeImage src="/images/home.png" />
              <HomeTitle>홈으로</HomeTitle>
            </LinkHeadText>
            {Object.keys(userObj).length === 3 ? (
              <LinkHeadText onClick={onMenuClick} to="/make">
                월드컵 만들기
              </LinkHeadText>
            ) : (
              <HeadText>{WOLRD_LOGIN}</HeadText>
            )}
            {Object.keys(userObj).length === 3 && (
              <LinkHeadText onClick={onMenuClick} to="/my-page">
                나의 월드컵
              </LinkHeadText>
            )}
          </MobileMenu>
        </>
      )}
    </Container>
  );
}
