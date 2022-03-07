import Ranking from 'pages/ranking/Ranking';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUserObjProps } from 'utils/interface';
import CommentForm from './components/CommentForm';

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 1053px;
`;

const CommentWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
`;

export default function Result({ userObj }: IUserObjProps) {
  console.log();
  return (
    <Container>
      <Ranking />
      <Wrapper>
        <CommentWrapper>
          <CommentForm userObj={userObj} />
        </CommentWrapper>
      </Wrapper>
    </Container>
  );
}
