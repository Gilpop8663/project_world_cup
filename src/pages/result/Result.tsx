import axios from 'axios';
import Ranking from 'pages/ranking/Ranking';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  height: 1441px;
`;

const CommentWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
`;

const NoData = styled.span`
  display: flex;
  left: 0;
  right: 0;
  padding-top: 200px;
  margin: 0 auto;
  justify-content: center;
  color: white;
  font-size: 40px;
  font-weight: bold;
`;

export default function Result({ userObj }: IUserObjProps) {
  const [noData, setNoData] = useState(false);
  const location = useLocation();
  const keyword = location.pathname.split('/');
  useEffect(() => {
    axios.get(`http://localhost:4000/world?id=${keyword[2]}`).then((res) => {
      if (res.data[0].count === 0) {
        setNoData(true);
      }
    });
  }, []);
  console.log(noData);
  return (
    <Container>
      {noData && <NoData>😢 진행된 적 없는 월드컵입니다.</NoData>}
      {!noData && (
        <>
          <Ranking />
          <Wrapper>
            <CommentWrapper>
              <CommentForm userObj={userObj} />
            </CommentWrapper>
          </Wrapper>
        </>
      )}
    </Container>
  );
}
