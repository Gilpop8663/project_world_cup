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
    await onGoogleLogin();
    setUserObj(userInfoObj);
    // axios.post('http://localhost:4000/user', userInfoObj);
    console.log(googleId, email, name);

    // 구글 로그인 성공시 서버에 전달할 데이터
    console.log('성공');
  };

  const onFailure = (error: any) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        buttonText="로그인"
        clientId={clientId}
        responseType={'id_token'}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}
