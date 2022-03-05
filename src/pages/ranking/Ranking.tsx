import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleText = styled.p`
  font-size: 23px;
  font-weight: 700;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 60px;
`;

const RankingTitle = styled.div`
  background-color: beige;
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameTitle = styled.div`
  background-color: aqua;
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PercentTitle = styled.div`
  background-color: green;
  width: 55%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// const Container = styled.div``;
// const Container = styled.div``;
// const Container = styled.div``;
// const Container = styled.div``;
// const Container = styled.div``;
// const Container = styled.div``;
// const Container = styled.div``;
// const Container = styled.div``;
// const Container = styled.div``;
// const Container = styled.div``;

export default function Ranking() {
  const [data, setData] = useState<any>();

  const location = useLocation();
  const keyword = location.pathname.slice(9);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/world?id=${keyword}`)
      .then((res) => setData(res.data[0]));
  }, []);

  console.log(data && data.list);

  if (!data) return null;
  return (
    <Container>
      <TitleWrapper>
        <RankingTitle>
          <TitleText>순위</TitleText>
        </RankingTitle>
        <NameTitle>
          <TitleText>이름</TitleText>
        </NameTitle>

        <PercentTitle>
          <TitleText>
            우승비율
            <br />
            (최종 우승 횟수 / 전체 게임수)
          </TitleText>
        </PercentTitle>
      </TitleWrapper>
      {data.list.map((ele: any, idx: number) => (
        <TitleWrapper key={idx}>
          <RankingTitle>
            <TitleText>{idx + 1}위</TitleText>
          </RankingTitle>
          <NameTitle>
            <TitleText>{ele.candidate}</TitleText>
          </NameTitle>
          <PercentTitle>
            <TitleText>{ele.score}</TitleText>
          </PercentTitle>
        </TitleWrapper>
      ))}
    </Container>
  );
}
