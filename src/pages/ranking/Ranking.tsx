import axios from 'axios';
import { BASE_URL } from 'constant';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  padding: 20px;
`;

const TitleText = styled.span`
  font-size: 17px;
  font-weight: 700;
  @media screen and (max-width: 1024px) {
    font-size: 14px;
    font-weight: 600;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
    font-weight: 600;
    display: flex;
  }
`;

const Description = styled.p`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
`;

const RankingTitle = styled.div`
  background-color: white;
  width: 8%;
  height: 100%;
  border: 2px solid #7982c9;
  margin: 3px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NameTitle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${({ sort }: { sort: boolean }) => (sort ? '#F4EEFF' : 'white')};
  width: 20%;
  height: 100%;
  border: 2px solid #7982c9;
  margin: 3px;
  cursor: pointer;
  padding: 10px;
  border-radius: 6px;
  @media screen and (max-width: 768px) {
    width: 30%;
  }
`;

const ChampionTitle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${({ sort }: { sort: boolean }) => (sort ? '#F4EEFF' : 'white')};
  width: 36%;
  height: 100%;
  border: 2px solid #7982c9;
  margin: 3px;
  cursor: pointer;
  padding: 10px;
  padding-right: 20px;
  border-radius: 6px;
  @media screen and (max-width: 768px) {
    width: 40%;
  }
`;

const WinnerTitle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${({ sort }: { sort: boolean }) => (sort ? '#F4EEFF' : 'white')};
  width: 36%;
  height: 100%;
  border: 2px solid #7982c9;
  margin: 3px;
  cursor: pointer;
  padding: 10px;
  padding-right: 20px;
  border-radius: 6px;
  @media screen and (max-width: 768px) {
    width: 40%;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const RankingTitleList = styled.div`
  background-color: white;
  width: 8%;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #7982c9;
  margin: 3px;
  padding: 10px;
  border-radius: 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NameTitleList = styled.div`
  background-color: white;
  width: 20%;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #7982c9;
  margin: 3px;
  padding: 10px;
  border-radius: 6px;
  word-break: break-all;
  @media screen and (max-width: 768px) {
    width: 30%;
  }
`;

const PercentTitleList = styled.div`
  background-color: white;
  width: 36%;
  height: 100%;
  border: 2px solid #7982c9;
  margin: 3px;
  color: #424874;
  padding: 10px;
  padding-right: 20px;
  border-radius: 6px;
  @media screen and (max-width: 768px) {
    width: 40%;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 15px;
  background-color: white;
  border: 2px solid #424874;
  margin-top: 10px;
  border-radius: 5px;
  padding: 4px;
`;

const Chart = styled.div`
  height: 100%;
  background-color: #8a94e1;
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
    axios.get(`${BASE_URL}/world?id=${keyword[2]}`).then((res) => {
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

  if (!data) return null;

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
            <Description>(최종 우승 횟수 / 전체 게임수)</Description>
          </TitleText>
          {nowSortChampion && (
            <TitleText>{isSortChampion ? '🔻' : '🔺'}</TitleText>
          )}
        </ChampionTitle>
        <WinnerTitle sort={nowSortWin} onClick={() => sortList(setIsSortWin)}>
          <TitleText>
            라운드 승률
            <br />
            <Description>(라운드 이긴 횟수 / 라운드 진행 수)</Description>
          </TitleText>
          {nowSortWin && <TitleText>{isSortWin ? '🔻' : '🔺'}</TitleText>}
        </WinnerTitle>
      </TitleWrapper>
      {data &&
        data.map((ele: any, idx: number) => (
          <ListWrapper key={idx}>
            <RankingTitleList>
              <TitleText>{idx + 1}위</TitleText>
            </RankingTitleList>
            <NameTitleList>
              <TitleText>
                {/* <RankingNumberText>{idx + 1}위. </RankingNumberText> */}
                {ele.candidate}
              </TitleText>
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
          </ListWrapper>
        ))}
    </Container>
  );
}
