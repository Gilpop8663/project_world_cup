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
  height: 1000px;
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

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modal]);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/world?id=${keyword}`)
      .then((res) => (setData(res.data[0]), setList(res.data[0].list)));
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

      console.log('우승자', winner);
      console.log('결승 리스트', final);
      console.log('4강 리스트', semiFinals);
      console.log('8강 리스트', quarterFinals);
      console.log('전체리스트', data);
    }
    axios.put(`http://localhost:4000/world/${keyword}`, {
      list: data.list,
      ...data,
    });
  }, [winner]);

  const setDraw = (addNum: number, setListFunction: any, setList: any) => {
    setListFunction((prev: any) => {
      const winnerList = setList[index + addNum];
      return [...prev, winnerList];
    });
    setList[index + addNum].score += 1;
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

  if (!list) return null;

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
      {modal && <Modal winner={winner} />}
    </>
  );
}

export default WorldCup;
