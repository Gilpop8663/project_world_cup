import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleText: any = styled.p`
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
  background-color: orange;
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
  const [count, setCount] = useState<number>(0);

  const location = useLocation();
  const keyword = location.pathname.slice(9);

  useEffect(() => {
    axios.get(`http://localhost:4000/world?id=${keyword}`).then((res) => {
      setData(res.data[0].list.sort((a: any, b: any) => b.score - a.score));
      setCount(res.data[0].count);
    });
  }, []);

  const winnerPercent = (num: any) => {
    let sumScore: number = 0;
    for (let i = 0; i < data.length; i++) {
      sumScore += data[i].score;
    }
    const percent: number = (num / sumScore) * 100;
    return percent.toFixed(1);
  };

  console.log(count);
  console.log(data && data);

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
      {data &&
        data.map((ele: any, idx: number) => (
          <TitleWrapper key={idx}>
            <RankingTitle>
              <TitleText>{idx + 1}위</TitleText>
            </RankingTitle>
            <NameTitle>
              <TitleText>{ele.candidate}</TitleText>
            </NameTitle>
            <PercentTitle>
              <TitleText>{winnerPercent(ele.score)}%</TitleText>
            </PercentTitle>
          </TitleWrapper>
        ))}
    </Container>
  );
}
