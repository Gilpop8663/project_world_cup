// import { EMAIL_NAME, GITHUB, GOOGLE, PASSWORD_NAME } from 'constants/contants';
// import { authService } from '../../firebase';
// import {
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from 'firebase/auth';
// import React, { FormEvent, useState } from 'react';
// import styled from 'styled-components';
// import AuthSocialLogin from './components/AuthSocialLogin';
// import { useNavigate } from 'react-router-dom';

// const Container = styled.div``;

// const Form = styled.form``;

// const Input = styled.input``;

// const LoginSelecetBox = styled.div``;

// const LoginSelect = styled.div``;

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     let data;
//     try {
//       data = await signInWithEmailAndPassword(authService, email, password);
//       navigate('/');
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { name, value },
//     } = e;
//     if (name === EMAIL_NAME) {
//       setEmail(value);
//     } else if (name === PASSWORD_NAME) {
//       setPassword(value);
//     }
//   };
//   const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     const {
//       currentTarget: { name },
//     } = e;
//     let provider;
//     if (name === GOOGLE) {
//       provider = new GoogleAuthProvider();
//     } else if (name === GITHUB) {
//       provider = new GithubAuthProvider();
//     }

//     provider && (await signInWithPopup(authService, provider));
//     navigate('/');
//   };
//   return (
//     <Container>
//       <Form onSubmit={onSubmit}>
//         <Input
//           value={email}
//           onChange={onChange}
//           name="email"
//           type="email"
//           required
//           placeholder="이메일을 입력해주세요"
//         />
//         <Input
//           value={password}
//           type="password"
//           required
//           onChange={onChange}
//           name="password"
//           placeholder="6자리 이상 비밀번호를 입력해주세요"
//         />
//         <Input type="submit" />
//       </Form>
//       <LoginSelecetBox>
//         <AuthSocialLogin
//           name={GOOGLE}
//           onSocialClick={onSocialClick}
//           title="Google"
//           imageSrc="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
//         />
//         <AuthSocialLogin
//           name={GITHUB}
//           onSocialClick={onSocialClick}
//           title="Github"
//           imageSrc="https://cdn-icons-png.flaticon.com/512/25/25231.png"
//         />
//       </LoginSelecetBox>
//     </Container>
//   );
// }
import React from 'react';

export default function Login() {
  return <div>Login</div>;
}
