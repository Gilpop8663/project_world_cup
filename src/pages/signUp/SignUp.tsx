import { EMAIL_NAME, PASSWORD_NAME } from 'constants/contants';
import { authService } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div``;

const Form = styled.form``;

const Input = styled.input``;

const LoginSelecetBox = styled.div``;

const LoginSelect = styled.div``;

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data;
    try {
      data = await createUserWithEmailAndPassword(authService, email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === EMAIL_NAME) {
      setEmail(value);
    } else if (name === PASSWORD_NAME) {
      setPassword(value);
    }
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          value={email}
          onChange={onChange}
          name="email"
          type="email"
          required
          placeholder="이메일을 입력해주세요"
        />
        <Input
          value={password}
          type="password"
          required
          onChange={onChange}
          name="password"
          placeholder="6자리 이상 비밀번호를 입력해주세요"
        />
        <Input type="submit" />
      </Form>
    </Container>
  );
}
