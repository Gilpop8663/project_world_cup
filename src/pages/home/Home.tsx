import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const WorldCupTitle = styled.p`
  font-size: 30px;
`;

const Container = styled.div`
  display: grid;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  margin: 0 auto;
  width: 70%;
`;
const TitleBox: any = styled.div`
  background-color: beige;
  border-radius: 20px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
// const Container = styled.div``;
// const Container = styled.div``;

export default function Home() {
  const navigate = useNavigate();

  const [listArr, setListArr] = useState<any>([{}]);
  useEffect(() => {
    axios.get('http://localhost:4000/world').then((res) => {
      setListArr(res.data);
    });
  }, []);

  const goToWorldCup = (item: any) => {
    navigate(`/world/${item.id}`);
  };

  return (
    <Container>
      {listArr.map((item: any, idx: number) => (
        <div key={idx}>
          <TitleBox
            onClick={() => {
              goToWorldCup(item);
            }}
          >
            <WorldCupTitle>{item.title}</WorldCupTitle>
          </TitleBox>
        </div>
      ))}
    </Container>
  );
}
