import axios from 'axios';
import WorldCupList from 'components/WorldCupList';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUserObjProps } from 'utils/interface';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyPageTitle = styled.h2`
  padding-left: 100px;
  margin-bottom: 30px;
`;

export default function MyPage({ userObj }: IUserObjProps) {
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/world?creatorId=${userObj.userId}`)
      .then((res) => {
        setMyData(res.data);
      });
  }, []);
  return (
    <Container>
      <MyPageTitle>내가 만든 월드컵</MyPageTitle>
      <WorldCupList data={myData} />
    </Container>
  );
}
