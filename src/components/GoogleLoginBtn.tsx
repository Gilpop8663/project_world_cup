import axios from 'axios';
import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';

const clientId =
  '586282779729-89d3k141i3b637fm739kvc5odonnmgm3.apps.googleusercontent.com';

const Container = styled.div`
  display: flex;
  @media only screen and (max-width: 768px) {
    margin-right: 10px;
  }
`;

export default function GoogleLoginBtn({ onGoogleLogin, setUserObj }: any) {
  const onSuccess = async (response: any) => {
    const {
      googleId,
      profileObj: { email, name },
    } = response;

    const userInfoObj = {
      userId: googleId,
      email: email,
      userName: name,
    };
    console.log(googleId);
    await onGoogleLogin();
    setUserObj(userInfoObj);
  };

  const onFailure = (error: string) => {
    console.log(error);
  };

  const ID: any = process.env.REACT_APP_GOOGLE_ID;
  return (
    <Container>
      <GoogleLogin
        buttonText="로그인"
        clientId={ID}
        responseType="id_token"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </Container>
  );
}
