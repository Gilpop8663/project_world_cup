import axios from 'axios';
import { BASE_URL } from 'constants/contants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IUserObjProps, IWorldCupProps } from 'utils/interface';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
`;

const WorldCupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox: any = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #424874;
  font-weight: 600;
  border: 2px solid #7982c9;
  @media screen and (max-width: 1024px) {
    height: 200px;
  }
  @media screen and (max-width: 768px) {
    height: 150px;
  }
`;

const WorldCupTitle = styled.p`
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;

const LinkWrapper = styled.div<{ isDelete: boolean }>`
  margin-top: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: ${({ isDelete }) =>
    isDelete ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  grid-column-gap: 10px;
  text-align: center;
`;

const LinkSelectButton = styled.div`
  padding: 10px 0px;
  background-color: white;
  cursor: pointer;
  border-radius: 7px;
  border: 2px solid #7982c9;
  font-size: 14px;
  font-weight: 600;
  color: #424874;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

interface IWorldCupList {
  data: IWorldCupProps[];
  userObj?: IUserObjProps | any;
  setData?: React.Dispatch<React.SetStateAction<IWorldCupProps[]>>;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WorldCupList({
  data,
  userObj,
  setData,
  setRefetch,
}: IWorldCupList) {
  const navigate = useNavigate();

  const isDelete = Boolean(setData);
  const goToWorldCup = (worldId: string) => {
    navigate(`/world/${worldId}`);
  };

  const goToResult = (worldId: string) => {
    navigate(`/world/${worldId}/result`);
  };

  const onDeleteClick = (worldId: string) => {
    if (!setData) return;
    if (!setRefetch) return;
    const ok = window.confirm('정말 삭제하시겠습니까?');
    console.log(ok);
    if (ok) {
      if (data.length === 1) {
        setData([]);
      }
      axios
        .delete(`${BASE_URL}/world/${worldId}`)
        .then(() => setRefetch((prev) => !prev))
        .catch((error) => console.log('삭제 실패', error));
    }
  };

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
          <LinkWrapper isDelete={isDelete}>
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
            {isDelete && item.creatorId === userObj?.userId && (
              <LinkSelectButton onClick={() => onDeleteClick(item.id)}>
                삭제하기
              </LinkSelectButton>
            )}
          </LinkWrapper>
        </WorldCupWrapper>
      ))}
    </Container>
  );
}
