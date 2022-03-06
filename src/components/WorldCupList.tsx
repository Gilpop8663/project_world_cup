import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IWorldCupProps } from 'utils/interface';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  padding: 50px;
`;

const WorldCupWrapper = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const WorldCupTitle = styled.p`
  font-size: 30px;
`;

const ResultLink = styled.div`
  padding: 10px 15px;
  background-color: tomato;
  cursor: pointer;
`;

interface IWorldCupList {
  data: IWorldCupProps[];
}

export default function WorldCupList({ data }: IWorldCupList) {
  const navigate = useNavigate();

  const goToWorldCup = (worldId: string) => {
    navigate(`/world/${worldId}`);
  };

  const goToResult = (worldId: string) => {
    navigate(`/world/${worldId}/result`);
  };
  return (
    <Container>
      {data?.map((item, idx) => (
        <WorldCupWrapper key={idx}>
          <TitleBox
            onClick={() => {
              goToWorldCup(item.id);
            }}
          >
            <WorldCupTitle>{item.title}</WorldCupTitle>
          </TitleBox>
          <ResultLink onClick={() => goToResult(item.id)}>랭킹 보기</ResultLink>
        </WorldCupWrapper>
      ))}
    </Container>
  );
}
