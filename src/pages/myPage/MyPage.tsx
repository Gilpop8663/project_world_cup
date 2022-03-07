import axios from 'axios';
import WorldCupList from 'components/WorldCupList';
import { BASE_URL } from 'constants/contants';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUserObjProps } from 'utils/interface';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 200px;
  justify-content: flex-start;
`;

const MyPageTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
  color: white;
`;

const NoData = styled.h2`
  font-size: 40px;
  font-weight: 600;
  color: white;
`;

export default function MyPage({ userObj }: IUserObjProps) {
  const [myData, setMyData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    axios.get(`${BASE_URL}/world?creatorId=${userObj.userId}`).then((res) => {
      const isOwner = res.data[0].creatorId === userObj.userId;
      if (!isOwner || !myData[0]) {
        setMyData([]);
      }
      setMyData(res.data);
    });
  }, [refetch, userObj.userId]);

  console.log(myData);

  return (
    <Container>
      <MyPageTitle>내가 만든 월드컵</MyPageTitle>
      {myData.length > 0 ? (
        <WorldCupList
          setData={setMyData}
          userObj={userObj}
          setRefetch={setRefetch}
          data={myData}
        />
      ) : (
        <NoData>😢 만든 월드컵이 없습니다. 월드컵을 생성해주세요.</NoData>
      )}
    </Container>
  );
}
