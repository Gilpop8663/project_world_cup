import axios from 'axios';
import Loading from 'components/Loading';
import WorldCupList from 'components/WorldCupList';
import { BASE_URL } from 'constants/contants';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IWorldCupProps } from 'utils/interface';

const Container = styled.div`
  padding: 60px 200px;
  background-color: #a6b1e1;
`;

const SortTextWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SortText = styled.div`
  margin-right: 20px;
  padding: 8px;
  background-color: white;
  color: #424874;
  font-size: 12px;
  border-radius: 10px;
  font-weight: 600;
  border: 2px solid #7982c9;
`;

export default function Home() {
  const [listArr, setListArr] = useState<any>([]);
  const [isSort, setIsSort] = useState<boolean>(true);
  useEffect(() => {
    axios.get(`${BASE_URL}/world`).then((res) => {
      console.log(res.data);
      setListArr(
        res.data.sort(
          (a: IWorldCupProps, b: IWorldCupProps) => b.count - a.count
        )
      );
    });
  }, []);

  const sortList = (sortType: any) => {
    if (sortType === 'sortCount') {
      setListArr(
        listArr.sort(
          (a: IWorldCupProps, b: IWorldCupProps) => b.count - a.count
        )
      );
      setIsSort(!isSort);
    }
    if (sortType === 'sortName') {
      setListArr(
        listArr.sort((a: any, b: any) => (b.title > a.title ? -1 : 1))
      );
      setIsSort(!isSort);
    }
    if (sortType === 'sortDate') {
      setListArr(listArr.sort((a: any, b: any) => b.createdAt - a.createdAt));
      setIsSort(!isSort);
    }
  };
  return (
    <Container>
      <Loading />
      <SortTextWrapper>
        <SortText onClick={() => sortList('sortCount')}>👍 인기순</SortText>
        <SortText onClick={() => sortList('sortDate')}>⏱ 최신순</SortText>
        <SortText onClick={() => sortList('sortName')}>🅰 이름순</SortText>
      </SortTextWrapper>
      <WorldCupList data={listArr} />
    </Container>
  );
}
