import axios from 'axios';
import WorldCupList from 'components/WorldCupList';
import { BASE_URL } from 'constants/contants';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUserObjProps } from 'utils/interface';
import Loading from 'components/Loading';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 200px;
  justify-content: flex-start;
  @media screen and (max-width: 1024px) {
    padding: 60px 60px;
  }
  @media screen and (max-width: 768px) {
    padding: 30px 20px;
  }
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
  white-space: pre-wrap;
  line-height: 50px;
  @media only screen and (max-width: 1024px) {
    font-size: 32px;
    line-height: 40px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 30px;
  }
`;

const NO_DATA = '😢 만든 월드컵이 없습니다.\n월드컵을 생성해주세요.';

export default function MyPage({ userObj }: IUserObjProps) {
  const navigate = useNavigate();
  const [myData, setMyData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (Boolean(!userObj.userId)) {
      navigate('/');
    }
  }, [userObj.userId, navigate]);

  useEffect(() => {
    axios.get(`${BASE_URL}/world?creatorId=${userObj.userId}`).then((res) => {
      if (res.data.length === 0) {
        setLoading(false);
      }
      const isOwner = res.data[0].creatorId === userObj.userId;
      if (!isOwner || !myData[0]) {
        setMyData([]);
      }
      setMyData(res.data);
      setLoading(false);
    });
  }, [refetch, userObj.userId]);

  return (
    <Container>
      <MyPageTitle>내가 만든 월드컵</MyPageTitle>
      {loading && <Loading />}
      {!loading && myData.length > 0 ? (
        <WorldCupList
          setData={setMyData}
          userObj={userObj}
          setRefetch={setRefetch}
          data={myData}
        />
      ) : (
        !loading && <NoData>{NO_DATA}</NoData>
      )}
    </Container>
  );
}
