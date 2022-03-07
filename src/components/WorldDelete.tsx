import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IUserObjProps, IWorldCupProps } from 'utils/interface';

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
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;
const LinkWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  text-align: center;
`;

const LinkButton = styled.div`
  padding: 10px 0px;
  background-color: #fec96f;
  cursor: pointer;
  border-radius: 7px;
`;

interface IWorldCupList {
  data: IWorldCupProps[];
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  userObj?: IUserObjProps | any;
  setData: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function WorldCupDelete({
  data,
  setRefetch,
  userObj,
  setData,
}: IWorldCupList) {
  const navigate = useNavigate();

  const goToWorldCup = (worldId: string) => {
    navigate(`/world/${worldId}`);
  };

  const goToResult = (worldId: string) => {
    navigate(`/world/${worldId}/result`);
  };

  const onDeleteClick = (worldId: string) => {
    if (data.length === 1) {
      setData([]);
    }
    if (!setRefetch) return;
    axios
      .delete(`http://localhost:4000/world/${worldId}`)
      .then(() => setRefetch((prev) => !prev))
      .catch((error) => console.log('삭제 실패', error));
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
            <WorldCupTitle>{item.title} 월드컵</WorldCupTitle>
          </TitleBox>
          <LinkWrapper>
            <LinkButton
              onClick={() => {
                goToWorldCup(item.id);
              }}
            >
              참여하기
            </LinkButton>
            <LinkButton onClick={() => goToResult(item.id)}>
              랭킹보기
            </LinkButton>
            {item.creatorId === userObj?.userId && (
              <LinkButton onClick={() => onDeleteClick(item.id)}>
                삭제하기
              </LinkButton>
            )}
          </LinkWrapper>
        </WorldCupWrapper>
      ))}
    </Container>
  );
}
