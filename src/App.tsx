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
function App() {
  const [data, setData] = useState<any>({});
  const [index, setIndex] = useState(0);
  const [quarterFinals, setQuarterFinals] = useState([{}]);

  useEffect(() => {
    axios.get('/data/data.json').then((res) => setData(res.data));
  }, []);

  const leftSelect = () => {
    setQuarterFinals((prev: any) => {
      const newObj = data.list[index];
      return [...prev, newObj];
    });
    if (index === 14) {
      setIndex(0);
    }
    setIndex((prev) => prev + 2);
  };

  const rightSelect = () => {
    setQuarterFinals((prev: any) => {
      const newObj = data.list[index + 1];
      return [...prev, newObj];
    });
    setIndex((prev) => prev + 2);
  };

  console.log(index);
  console.log('8강', quarterFinals);

  if (!data.list) return <div />;
  return (
    <>
      <TitleBox>
        <p>자바스크립트 월드컵 (16강)</p>
      </TitleBox>
      <SelectContainer>
        <LeftSelectBox onClick={leftSelect}>
          <p>{data.list[index].candidate}</p>
        </LeftSelectBox>
        <RightSelectBox onClick={rightSelect}>
          <p>{data.list[index + 1].candidate}</p>
        </RightSelectBox>
      </SelectContainer>
    </>
  );
}

export default App;
