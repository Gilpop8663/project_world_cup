import axios from 'axios';
import WorldCupList from 'components/WorldCupList';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUserObjProps } from 'utils/interface';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 200px;
`;

const MyPageTitle = styled.h2`
  padding-left: 100px;
  margin-bottom: 30px;
`;

export default function MyPage({ userObj }: IUserObjProps) {
  const [myData, setMyData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/world?creatorId=${userObj.userId}`)
      .then((res) => {
        const isOwner = res.data[0].creatorId === userObj.userId;
        if (!isOwner || !myData[0]) {
          setMyData([]);
        }
        setMyData(res.data);
      });
  }, [refetch, userObj.userId]);

  return (
    <Container>
      <MyPageTitle>내가 만든 월드컵</MyPageTitle>
      <WorldCupList
        setData={setMyData}
        userObj={userObj}
        setRefetch={setRefetch}
        data={myData}
      />
    </Container>
  );
}
