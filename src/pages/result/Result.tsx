import axios from 'axios';
import { BASE_URL } from 'constants/contants';
import Ranking from 'pages/ranking/Ranking';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IUserObjProps } from 'utils/interface';
import CommentForm from './components/CommentForm';
import Loading from 'components/Loading';

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 1441px;
  max-height: 1441px;
  @media screen and (max-width: 768px) {
    max-height: 1000px;
  }
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
  @media only screen and (max-width: 1024px) {
    font-size: 32px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export default function Result({ userObj }: IUserObjProps) {
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const keyword = location.pathname.split('/');
  useEffect(() => {
    axios.get(`${BASE_URL}/world?id=${keyword[2]}`).then((res) => {
      if (res.data[0].count === 0) {
        setNoData(true);
      }
      setLoading(false);
    });
  }, []);
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : noData ? (
        <NoData>😢 진행된 적 없는 월드컵입니다.</NoData>
      ) : (
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
