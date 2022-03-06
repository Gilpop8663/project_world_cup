import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { setEnvironmentData } from 'worker_threads';

const Container = styled.div`
  height: 100%;
  padding: 20px;
`;

const TitleText: any = styled.p`
  font-size: 17px;
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
  width: 8%;
  height: 100%;
  display: flex;
  justify-content: center;

  padding: 15px;
  border: 2px solid white;
`;

const NameTitle = styled.div`
  background-color: aqua;
  width: 26%;
  height: 100%;
  display: flex;
  justify-content: center;

  padding: 15px;
  border: 2px solid white;
`;

const PercentTitle = styled.div`
  background-color: orange;
  width: 33%;
  height: 100%;
  padding: 15px;
  border: 2px solid white;

  /* justify-content: center;
  align-items: center; */
`;
const ChartWrapper = styled.div`
  width: 100%;
  height: 15px;
  padding: 3px;
  background-color: white;
  border-radius: 5px;
`;
const Chart = styled.div`
  height: 100%;
  background-color: pink;
  border-radius: 2px;
`;

export default function Ranking() {
  const [data, setData] = useState<any>();
  const [count, setCount] = useState<number>(0);

  const location = useLocation();
  const keyword = location.pathname.split('/');
  useEffect(() => {
    axios.get(`http://localhost:4000/world?id=${keyword[2]}`).then((res) => {
      const sortRoundWin: any = res.data[0].list.sort(
        (a: any, b: any) =>
          b.roundWin / (b.roundWin + b.roundLose) -
          a.roundWin / (a.roundWin + a.roundLose)
      );
      setData(sortRoundWin.sort((a: any, b: any) => b.champion - a.champion));
      setData(sortRoundWin);
      setCount(res.data[0].count);
    });
  }, []);

  const roundWinPercent = (roundWin: number, roundLose: number) => {
    const percent: number = (roundWin / (roundWin + roundLose)) * 100;
    return percent.toFixed(1);
  };

  const championPercent = (num: any) => {
    const percent: number = (num / count) * 100;
    return percent.toFixed(1);
  };

  console.log(data);

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
        <PercentTitle>
          <TitleText>
            라운드 승률
            <br />
            (라운드 이긴 횟수 / 라운드 진행 수)
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
              <TitleText>{championPercent(ele.champion)}%</TitleText>
              <ChartWrapper>
                <Chart style={{ width: `${championPercent(ele.champion)}%` }} />
              </ChartWrapper>
            </PercentTitle>
            <PercentTitle>
              <TitleText>
                {roundWinPercent(ele.roundWin, ele.roundLose)}%
              </TitleText>
              <ChartWrapper>
                <Chart
                  style={{
                    width: `${roundWinPercent(ele.roundWin, ele.roundLose)}%`,
                  }}
                />
              </ChartWrapper>
            </PercentTitle>
          </TitleWrapper>
        ))}
    </Container>
  );
}
