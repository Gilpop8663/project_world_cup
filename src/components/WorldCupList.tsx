import WorldCup from 'pages/worldCup/WorldCup';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IWorldCupProps } from 'utils/interface';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
`;

const WorldCupWrapper = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox: any = styled.div`
  background-color: #f4eeff;
  border-radius: 20px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1.5px solid #424874;
`;

const WorldCupTitle = styled.p`
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;

const LinkWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  text-align: center;
`;
const LinkSelectButton = styled.div`
  padding: 10px 15px;
  background-color: #424874;
  cursor: pointer;
  border-radius: 7px;
  border: 1.5px solid #f4eeff;
`;

interface IWorldCupList {
  data: IWorldCupProps[];
}

export default function WorldCupList({ data, isSort }: any) {
  const [listArr, setListArr] = useState<any>([]);
  const navigate = useNavigate();

  const goToWorldCup = (worldId: string) => {
    navigate(`/world/${worldId}`);
  };

  const goToResult = (worldId: string) => {
    navigate(`/world/${worldId}/result`);
  };

  useEffect(() => {
    setListArr(data);
  }, [isSort]);

  return (
    <Container>
      {data?.map((item: any, idx: any) => (
        <WorldCupWrapper key={idx}>
          <TitleBox
            onClick={() => {
              goToWorldCup(item.id);
            }}
          >
            <WorldCupTitle>{item.title} 월드컵</WorldCupTitle>
          </TitleBox>
          <LinkWrapper>
            <LinkSelectButton
              onClick={() => {
                goToWorldCup(item.id);
              }}
            >
              참여하기
            </LinkSelectButton>
            <LinkSelectButton onClick={() => goToResult(item.id)}>
              랭킹보기
            </LinkSelectButton>
          </LinkWrapper>
        </WorldCupWrapper>
      ))}
    </Container>
  );
}
