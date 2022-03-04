import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Form = styled.form``;

const Input = styled.input``;

const LoginSelecetBox = styled.div``;

const LoginSelect = styled.div``;

export default function Login() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
  };
  return (
    <Container>
      <Form>
        <Input
          onChange={onChange}
          name="email"
          type="email"
          required
          placeholder="이메일을 입력해주세요"
        />
        <Input
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
