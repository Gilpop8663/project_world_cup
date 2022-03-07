import axios from 'axios';
import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId =
  '586282779729-89d3k141i3b637fm739kvc5odonnmgm3.apps.googleusercontent.com';

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
    <div>
      <GoogleLogin
        buttonText="로그인"
        clientId={ID}
        responseType="id_token"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}
