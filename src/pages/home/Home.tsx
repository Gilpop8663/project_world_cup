import axios from 'axios';
import WorldCupList from 'components/WorldCupList';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IWorldCupProps } from 'utils/interface';

const Container = styled.div`
  padding: 60px;
  background-color: #a6b1e1;
`;

const SortTextWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SortText = styled.div`
  margin-right: 20px;
  padding: 10px;
  background-color: #69a2ff;
  border-radius: 14px;
`;

export default function Home() {
  const [listArr, setListArr] = useState<any>([{}]);
  const [isSort, setIsSort] = useState<boolean>(true);
  useEffect(() => {
    axios.get('http://localhost:4000/world').then((res) => {
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
      <SortTextWrapper>
        <SortText onClick={() => sortList('sortCount')}>인기순</SortText>
        <SortText onClick={() => sortList('sortDate')}>최신순</SortText>
        <SortText onClick={() => sortList('sortName')}>이름순</SortText>
      </SortTextWrapper>
      <WorldCupList data={listArr} isSort={isSort} />
    </Container>
  );
}
