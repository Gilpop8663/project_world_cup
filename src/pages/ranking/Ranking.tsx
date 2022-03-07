import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
  width: 100%;
  height: 60px;
`;

const RankingTitle = styled.div`
  background-color: skyblue;
  width: 8%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 15px;
  border: 2px solid white;
  cursor: pointer;
`;

const NameTitle: any = styled.div`
  background: ${({ sort }: { sort: boolean }) =>
    sort ? '#31adde' : 'skyblue'};
  width: 26%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid white;
  cursor: pointer;
`;

const ChampionTitle: any = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ sort }: { sort: boolean }) =>
    sort ? '#31adde' : 'skyblue'};
  width: 33%;
  height: 100%;
  padding: 15px;
  border: 2px solid white;
  cursor: pointer;
`;

const WinnerTitle: any = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ sort }: { sort: boolean }) =>
    sort ? '#31adde' : 'skyblue'};
  width: 33%;
  height: 100%;
  padding: 15px;
  border: 2px solid white;
  cursor: pointer;
`;

const RankingTitleList: any = styled.div`
  background-color: skyblue;
  width: 8%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 15px;
  border: 2px solid white;
`;

const NameTitleList = styled.div`
  background-color: skyblue;
  width: 26%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 15px;
  border: 2px solid white;
`;

const PercentTitleList = styled.div`
  background-color: skyblue;
  width: 33%;
  height: 100%;
  padding: 15px;
  border: 2px solid white;
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
  const [isSortChampion, setIsSortChampion] = useState<boolean>(true);
  const [isSortWin, setIsSortWin] = useState<boolean>(false);
  const [isSortName, setIsSortName] = useState<boolean>(false);
  const [nowSortChampion, setNowSortChampion] = useState<boolean>(true);
  const [nowSortWin, setNowSortWin] = useState<boolean>(false);
  const [nowSortName, setNowSortName] = useState<boolean>(false);

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

  const nowSort = (nowSortFunction: any) => {
    if (nowSortFunction === setIsSortChampion) {
      setNowSortChampion(true);
      setNowSortName(false);
      setNowSortWin(false);
      setIsSortName(false);
      setIsSortWin(false);
    }
    if (nowSortFunction === setIsSortWin) {
      setNowSortWin(true);
      setNowSortName(false);
      setNowSortChampion(false);
      setIsSortName(false);
      setIsSortChampion(false);
    }
    if (nowSortFunction === setIsSortName) {
      setNowSortName(true);
      setNowSortWin(false);
      setNowSortChampion(false);
      setIsSortWin(false);
      setIsSortChampion(false);
    }
  };

  const sortList = (sortListFunction: any) => {
    if (sortListFunction === setIsSortChampion && isSortChampion === false) {
      const reverseSortChampion = data.sort(
        (a: any, b: any) =>
          b.roundWin / (b.roundWin + b.roundLose) -
          a.roundWin / (a.roundWin + a.roundLose)
      );
      nowSort(setIsSortChampion);
      setIsSortChampion(true);
      setData(
        reverseSortChampion.sort((a: any, b: any) => b.champion - a.champion)
      );
    }
    if (sortListFunction === setIsSortChampion && isSortChampion === true) {
      const reverseSortChampion = data.sort(
        (a: any, b: any) =>
          a.roundWin / (a.roundWin + a.roundLose) -
          b.roundWin / (b.roundWin + b.roundLose)
      );
      nowSort(setIsSortChampion);
      setIsSortChampion(false);
      setData(
        reverseSortChampion.sort((a: any, b: any) => a.champion - b.champion)
      );
    }
    if (sortListFunction === setIsSortWin && isSortWin === false) {
      const reverseSortChampion = data.sort(
        (a: any, b: any) => b.champion - a.champion
      );
      nowSort(setIsSortWin);
      setIsSortWin(true);
      setData(
        reverseSortChampion.sort(
          (a: any, b: any) =>
            b.roundWin / (b.roundWin + b.roundLose) -
            a.roundWin / (a.roundWin + a.roundLose)
        )
      );
    }
    if (sortListFunction === setIsSortWin && isSortWin === true) {
      const reverseSortChampion = data.sort(
        (a: any, b: any) => a.champion - b.champion
      );
      nowSort(setIsSortWin);
      setIsSortWin(false);
      setData(
        reverseSortChampion.sort(
          (a: any, b: any) =>
            a.roundWin / (a.roundWin + a.roundLose) -
            b.roundWin / (b.roundWin + b.roundLose)
        )
      );
    }
    if (sortListFunction === setIsSortName && isSortName === false) {
      nowSort(setIsSortName);
      setIsSortName(true);
      setData(
        data.sort((a: any, b: any) => (b.candidate > a.candidate ? -1 : 1))
      );
    }
    if (sortListFunction === setIsSortName && isSortName === true) {
      nowSort(setIsSortName);
      setIsSortName(false);
      setData(
        data.sort((a: any, b: any) => (a.candidate > b.candidate ? -1 : 1))
      );
    }
  };

  // console.log('챔피언', isSortChampion);
  // console.log('라운드 승', isSortWin);
  // console.log('이름', isSortName);
  // console.log(data && data.sort((a: any, b: any) => a.candidate - b.candidate));
  if (!data) return null;
  if (data[0].roundWin === 0 && data[0].roundLose === 0) {
    return <p>데이터가 없는 월드컵 입니다</p>;
  }
  return (
    <Container>
      <TitleWrapper>
        <RankingTitle>
          <TitleText>순위</TitleText>
        </RankingTitle>
        <NameTitle sort={nowSortName} onClick={() => sortList(setIsSortName)}>
          <TitleText>이름</TitleText>
          {nowSortName && <TitleText>{isSortName ? '🔻' : '🔺'}</TitleText>}
        </NameTitle>
        <ChampionTitle
          sort={nowSortChampion}
          onClick={() => sortList(setIsSortChampion)}
        >
          <TitleText>
            우승비율
            <br />
            (최종 우승 횟수 / 전체 게임수)
          </TitleText>
          {nowSortChampion && (
            <TitleText>{isSortChampion ? '🔻' : '🔺'}</TitleText>
          )}
        </ChampionTitle>
        <WinnerTitle sort={nowSortWin} onClick={() => sortList(setIsSortWin)}>
          <TitleText>
            라운드 승률
            <br />
            (라운드 이긴 횟수 / 라운드 진행 수)
          </TitleText>
          {nowSortWin && <TitleText>{isSortWin ? '🔻' : '🔺'}</TitleText>}
        </WinnerTitle>
      </TitleWrapper>
      {data &&
        data.map((ele: any, idx: number) => (
          <TitleWrapper key={idx}>
            <RankingTitleList>
              <TitleText>{idx + 1}위</TitleText>
            </RankingTitleList>
            <NameTitleList>
              <TitleText>{ele.candidate}</TitleText>
            </NameTitleList>
            <PercentTitleList>
              <TitleText>{championPercent(ele.champion)}%</TitleText>
              <ChartWrapper>
                <Chart style={{ width: `${championPercent(ele.champion)}%` }} />
              </ChartWrapper>
            </PercentTitleList>
            <PercentTitleList>
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
            </PercentTitleList>
          </TitleWrapper>
        ))}
    </Container>
  );
}
