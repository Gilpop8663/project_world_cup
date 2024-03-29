import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  font-family: 'Nanum Gothic', sans-serif;
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
    await onGoogleLogin();
    setUserObj(userInfoObj);
  };

  const onFailure = (error: string) => {
    console.error(error);
  };

  const ID: string = process.env.REACT_APP_GOOGLE_ID;
  return (
    <Container>
      <GoogleLogin
        buttonText="로그인"
        isSignedIn={true}
        clientId={ID}
        responseType="id_token"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </Container>
  );
}
