import axios from 'axios';
import React from 'react';
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
  font-size: 30px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ResultLink = styled.div`
  padding: 10px 15px;
  background-color: tomato;
  cursor: pointer;
`;

const DeleteBtn = styled.div`
  padding: 10px 15px;
  background-color: tomato;
  cursor: pointer;
`;

interface IWorldCupList {
  data: IWorldCupProps[];
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  userObj?: IUserObjProps | any;
}

export default function WorldCupDelete({
  data,
  setRefetch,
  userObj,
}: IWorldCupList) {
  const navigate = useNavigate();

  const goToWorldCup = (worldId: string) => {
    navigate(`/world/${worldId}`);
  };

  const goToResult = (worldId: string) => {
    navigate(`/world/${worldId}/result`);
  };

  const onDeleteClick = (worldId: string) => {
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
            <WorldCupTitle>{item.title}</WorldCupTitle>
          </TitleBox>
          <BtnWrapper>
            <ResultLink onClick={() => goToResult(item.id)}>
              랭킹 보기
            </ResultLink>
            {item.creatorId === userObj.userId && (
              <DeleteBtn onClick={() => onDeleteClick(item.id)}>
                삭제하기
              </DeleteBtn>
            )}
          </BtnWrapper>
        </WorldCupWrapper>
      ))}
    </Container>
  );
}
