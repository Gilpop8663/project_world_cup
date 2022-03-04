import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
`;

const RightSelectBox = styled.div`
  width: 500px;
  height: 500px;
  background-color: yellow;
`;

// const TitleBox = styled.div`

// `;

// const TitleBox = styled.div`

// `;

// const TitleBox = styled.div`

// `;

// const TitleBox = styled.div`

// `;
function WorldCup() {
  const [data, setData] = useState<any>({});
  const [list, setList] = useState<any>([]);
  const [index, setIndex] = useState(0);
  const [quarterFinals, setQuarterFinals] = useState<any>([]);

  useEffect(() => {
    axios
      .get('/data/data.json')
      .then((res) => (setData(res.data), setList(res.data.list)));
  }, []);

  useEffect(() => {
    if (quarterFinals.length === 8) {
      setList(quarterFinals);
      setIndex(0);
    }
  }, [quarterFinals]);

  const quarterFinalsSet = (a: number) => {
    setQuarterFinals((prev: any) => {
      const newObj = data.list[index + a];
      return [...prev, newObj];
    });
  };

  const leftSelect = () => {
    const addNum = 0;
    if (quarterFinals.length < 8) {
      //   console.log('8번째입니다ㅣ');
      quarterFinalsSet(addNum);
      setIndex((prev) => prev + 2);
    }
  };

  const rightSelect = () => {
    const addNum = 1;
    quarterFinalsSet(addNum);
    if (index === 14) {
      setIndex(0);
    }
    setIndex((prev) => prev + 2);
  };

  // console.log('index', index);
  console.log(index);
  console.log('8강', quarterFinals);
  console.log('8강', quarterFinals.length);

  // console.log('adsadadsds', list);

  // if (!list) return <div />;
  return (
    <>
      <TitleBox>
        <p>{data.title}</p>
      </TitleBox>
      <SelectContainer>
        <LeftSelectBox onClick={leftSelect}>
          <p>{list[index] && list[index].candidate}</p>
        </LeftSelectBox>
        <RightSelectBox onClick={rightSelect}>
          <p>{list[index + 1] && list[index + 1].candidate}</p>
        </RightSelectBox>
      </SelectContainer>
    </>
  );
}

export default WorldCup;
