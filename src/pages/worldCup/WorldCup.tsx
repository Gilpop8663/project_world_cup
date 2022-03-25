import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'components/Modal';
import { useLocation } from 'react-router-dom';
import {
  BASE_URL,
  DEFAULT_SELECT,
  LEFT_SELECT,
  RIGHT_SELECT,
} from 'constants/contants';
import Loading from 'components/Loading';
import { IWorldCupItemProps, IWorldCupProps } from 'utils/interface';

const TitleText = styled.div`
  margin: 20px 0px 30px 0px;
  font-size: 45px;
  font-weight: 600;
  text-align: center;
  width: 100%;
  color: white;
`;

const SelectContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1024px;
  margin-top: 100px;
  @media screen and (max-width: 1024px) {
    width: 650px;
  }
  @media screen and (max-width: 768px) {
    width: 365px;
  }
`;

const LeftSelectBox = styled.div<{ selectState: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 360px;
  background-color: white;
  text-align: center;
  color: #424874;
  border-radius: 14px;
  padding: 15px;
  border: 2px solid #7982c9;
  word-break: break-all;
  opacity: ${({ selectState }) =>
    selectState === LEFT_SELECT || selectState === DEFAULT_SELECT ? '1' : '0'};
  transition: ${({ selectState }) =>
    selectState === LEFT_SELECT
      ? 'all 1s ease-in-out'
      : selectState === RIGHT_SELECT
      ? 'all 0.5s ease-in-out'
      : 'none'};
  transform: ${({ selectState }) =>
    selectState === LEFT_SELECT ? 'translateX(315px)' : 'none'};
  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 200px;
    transform: ${({ selectState }) =>
      selectState === LEFT_SELECT ? 'translateX(208px)' : 'none'};
  }
  @media screen and (max-width: 768px) {
    width: 110px;
    height: 110px;
    transform: ${({ selectState }) =>
      selectState === LEFT_SELECT ? 'translateX(113px)' : 'none'};
  }
`;

const RightSelectBox = styled.div<{ selectState: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 360px;
  background-color: white;
  color: #424874;
  text-align: center;
  border-radius: 14px;
  padding: 15px;
  border: 2px solid #7982c9;
  word-break: break-all;
  opacity: ${({ selectState }) =>
    selectState === RIGHT_SELECT || selectState === DEFAULT_SELECT ? '1' : '0'};
  transition: ${({ selectState }) =>
    selectState === RIGHT_SELECT
      ? 'all 1s ease-in-out'
      : selectState === LEFT_SELECT
      ? 'all 0.5s ease-in-out'
      : 'none'};
  transform: ${({ selectState }) =>
    selectState === RIGHT_SELECT ? 'translateX(-315px)' : 'none'};
  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 200px;
    transform: ${({ selectState }) =>
      selectState === RIGHT_SELECT ? 'translateX(-208px)' : 'none'};
  }
  @media screen and (max-width: 768px) {
    width: 110px;
    height: 110px;
    transform: ${({ selectState }) =>
      selectState === RIGHT_SELECT ? 'translateX(-113px)' : 'none'};
  }
`;

const Candidate = styled.p`
  font-size: 70px;
  font-weight: 900;
  @media screen and (max-width: 1024px) {
    font-size: 40px;
    font-weight: 700;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
    font-weight: 600;
  }
`;

const RoundBox = styled.div`
  text-align: center;
`;

const RoundText = styled.span`
  padding: 10px;
  font-size: 30px;
  font-weight: 900;
  border: 2px solid #7982c9;
  border-radius: 7px;
  color: #424874;
  background-color: white;
`;

const VsText = styled.p<{ selectState: string }>`
  font-size: 100px;
  color: white;
  font-weight: 800;
  font-family: sans-serif;
  -webkit-text-stroke: 4px #7982c9;
  opacity: ${({ selectState }) => (selectState !== DEFAULT_SELECT ? '0' : '1')};
  @media screen and (max-width: 1024px) {
    -webkit-text-stroke: 3px #7982c9;
    font-size: 70px;
    font-weight: 700;
  }
  @media screen and (max-width: 768px) {
    font-size: 40px;
    font-weight: 600;
    -webkit-text-stroke: 2px #7982c9;
  }
`;
function WorldCup() {
  const [data, setData] = useState<IWorldCupProps>();
  const [list, setList] = useState<IWorldCupItemProps[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [quarterFinals, setQuarterFinals] = useState<IWorldCupItemProps[]>([]);
  const [semiFinals, setSemiFinals] = useState<IWorldCupItemProps[]>([]);
  const [final, setFinal] = useState<IWorldCupItemProps[]>([]);
  const [winner, setWinner] = useState<IWorldCupItemProps[]>([]);
  const [roundInfo, setRoundInfo] = useState<string>('🏆 16강');
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const keyword = location.pathname.slice(7);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStyle, setSelectedStyle] = useState(DEFAULT_SELECT);
  const toggleModal = () => {
    setModal(!modal);
  };
  console.log('1', winner);

  const shuffleArray = (array: IWorldCupItemProps[]) => {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/world?id=${keyword}`).then((res) => {
      setData(res.data[0]);
      setList(shuffleArray(res.data[0].list));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (quarterFinals.length === 8) {
      setList(quarterFinals);
      setIndex(0);
      setRoundInfo('🏆 8강');
    }
  }, [quarterFinals]); // 8강 선택 완료 시 리스트 세팅

  useEffect(() => {
    if (semiFinals.length === 4) {
      setList(semiFinals);
      setIndex(0);
      setRoundInfo('🏆 4강');
    }
  }, [semiFinals]); // 4강 선택 완료 시 리스트 세팅

  useEffect(() => {
    if (final.length === 2) {
      setList(final);
      setIndex(0);
      setRoundInfo('🏆 결승');
    }
  }, [final]); // 결승 선택 완료 시 리스트 세팅

  useEffect(() => {
    if (winner.length === 1) {
      toggleModal();
      axios
        .put(`${BASE_URL}/world/${keyword}`, {
          ...data,
          list: data.list,
          count: (data.count += 1),
        })
        .then((res) => console.log('성공'));
    }
  }, [winner]);

  const setDraw = (
    addNum: number,
    setListFunction: React.Dispatch<React.SetStateAction<IWorldCupItemProps[]>>,
    setList: IWorldCupItemProps[]
  ) => {
    setListFunction((prev: IWorldCupItemProps[]) => {
      const winnerList = setList[index + addNum];
      return [...prev, winnerList];
    });
    if (addNum === 0) {
      setList[index].roundWin += 1;
      setList[index + 1].roundLose += 1;
    }
    if (addNum === 1) {
      setList[index + 1].roundWin += 1;
      setList[index].roundLose += 1;
    }
    if (setListFunction === setWinner) {
      if (addNum === 0) {
        setList[index].champion += 1;
      }
      if (addNum === 1) {
        setList[index + 1].champion += 1;
      }
    }
  };
  const selectCondidate = (addNum: number) => {
    if (quarterFinals.length < 8) {
      setDraw(addNum, setQuarterFinals, list);
      setIndex((prev) => prev + 2);
    }
    if (quarterFinals.length === 8 && semiFinals.length < 4) {
      setDraw(addNum, setSemiFinals, quarterFinals);
      setIndex((prev) => prev + 2);
    }
    if (
      quarterFinals.length === 8 &&
      semiFinals.length === 4 &&
      final.length < 2
    ) {
      setDraw(addNum, setFinal, semiFinals);
      setIndex((prev) => prev + 2);
    }
    if (
      quarterFinals.length === 8 &&
      semiFinals.length === 4 &&
      final.length === 2
    ) {
      setDraw(addNum, setWinner, final);
    }
  };

  const leftSelect = () => {
    if (selectedStyle !== DEFAULT_SELECT) return;
    const addNum = 0;
    setSelectedStyle(LEFT_SELECT);
    setTimeout(() => {
      selectCondidate(addNum);
      setSelectedStyle(DEFAULT_SELECT);
    }, 2000);
  };

  const rightSelect = () => {
    if (selectedStyle !== DEFAULT_SELECT) return;
    const addNum = 1;
    setSelectedStyle(RIGHT_SELECT);
    setTimeout(() => {
      selectCondidate(addNum);
      setSelectedStyle(DEFAULT_SELECT);
    }, 2000);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TitleText>{data.title} 월드컵</TitleText>
          <RoundBox>
            <RoundText>{roundInfo} </RoundText>
          </RoundBox>
          <SelectContainer>
            <LeftSelectBox selectState={selectedStyle} onClick={leftSelect}>
              <Candidate>{list[index] && list[index].candidate}</Candidate>
            </LeftSelectBox>
            <VsText selectState={selectedStyle}>VS</VsText>
            <RightSelectBox selectState={selectedStyle} onClick={rightSelect}>
              <Candidate>
                {list[index + 1] && list[index + 1].candidate}
              </Candidate>
            </RightSelectBox>
          </SelectContainer>
          {modal && <Modal winner={winner} resultId={keyword} />}
        </>
      )}
    </div>
  );
}

export default WorldCup;
