import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'components/Modal';
import { useLocation } from 'react-router-dom';

const TitleBox = styled.div`
  width: 100%;
  height: 100px;
  background-color: aqua;
`;

const SelectContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const LeftSelectBox = styled.div`
  width: 500px;
  height: 500px;
  background-color: beige;
  text-align: center;
`;

const RightSelectBox = styled.div`
  width: 500px;
  height: 500px;
  background-color: yellow;
  text-align: center;
`;

const LeftCandidate = styled.p`
  margin-top: 200px;
  font-size: 70px;
  font-weight: 900;
`;

const RightCandidate = styled.div`
  margin-top: 200px;
  font-size: 70px;
  font-weight: 900;
`;

const RoundBox = styled.div`
  text-align: center;
`;

const RoundText = styled.div`
  margin: 0 auto;
  margin: 30px;
  font-size: 30px;
  font-weight: 900;
`;
function WorldCup() {
  const [data, setData] = useState<any>({});
  const [list, setList] = useState<any>([]);
  const [index, setIndex] = useState(0);
  const [quarterFinals, setQuarterFinals] = useState<any>([]);
  const [semiFinals, setSemiFinals] = useState<any>([]);
  const [final, setFinal] = useState<any>([]);
  const [winner, setWinner] = useState<any>([]);
  const [roundInfo, setRoundInfo] = useState<string>('🏆 16강전');
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const keyword = location.pathname.slice(7);

  const toggleModal = () => {
    setModal(!modal);
  };

  const shuffleArray = (array: any) => {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/world?id=${keyword}`)
      .then(
        (res) => (setData(res.data[0]), setList(shuffleArray(res.data[0].list)))
      );
  }, []);

  useEffect(() => {
    if (quarterFinals.length === 8) {
      setList(quarterFinals);
      setIndex(0);
      setRoundInfo('🏆 8강전');
    }
  }, [quarterFinals]); // 8강 선택 완료 시 리스트 세팅

  useEffect(() => {
    if (semiFinals.length === 4) {
      setList(semiFinals);
      setIndex(0);
      setRoundInfo('🏆 4강전');
    }
  }, [semiFinals]); // 4강 선택 완료 시 리스트 세팅

  useEffect(() => {
    if (final.length === 2) {
      setList(final);
      setIndex(0);
      setRoundInfo('🏆 결승전');
    }
  }, [final]); // 결승 선택 완료 시 리스트 세팅

  useEffect(() => {
    if (winner.length === 1) {
      toggleModal();
      axios
        .put(`http://localhost:4000/world/${keyword}`, {
          ...data,
          list: data.list,
          count: (data.count += 1),
        })
        .then((res) => console.log('성공'));
    }
  }, [winner]);

  console.log(data);

  const setDraw = (addNum: number, setListFunction: any, setList: any) => {
    setListFunction((prev: any) => {
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
    const addNum = 0;
    selectCondidate(addNum);
  };

  const rightSelect = () => {
    const addNum = 1;
    selectCondidate(addNum);
  };

  return (
    <>
      <TitleBox>
        <p>{data.title}</p>
      </TitleBox>
      <RoundBox>
        <RoundText>{roundInfo} </RoundText>
      </RoundBox>
      <SelectContainer>
        <LeftSelectBox onClick={leftSelect}>
          <LeftCandidate>{list[index] && list[index].candidate}</LeftCandidate>
        </LeftSelectBox>
        <RightSelectBox onClick={rightSelect}>
          <RightCandidate>
            {list[index + 1] && list[index + 1].candidate}
          </RightCandidate>
        </RightSelectBox>
      </SelectContainer>
      {modal && <Modal winner={winner} resultId={keyword} />}
    </>
  );
}

export default WorldCup;
