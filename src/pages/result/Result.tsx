import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUserObjProps } from 'utils/interface';
import CommentForm from './components/CommentForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Result({ userObj }: IUserObjProps) {
  return (
    <Container>
      <CommentForm userObj={userObj} />
    </Container>
  );
}
