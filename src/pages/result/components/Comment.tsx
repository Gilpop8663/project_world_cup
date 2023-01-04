import axios from 'axios';
import { BASE_URL } from 'constant';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  IWorldCupProps,
  IUserObj,
  IWorldCupCommentProps,
} from 'utils/interface';
import { dateFormater } from 'utils/utilFn';

interface ICommentProps {
  id: string;
  text: string;
  userId: string;
  createdAt: number | Date;
  creatorId: string;
  data: IWorldCupProps;
  userObj: IUserObj;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.li`
  display: flex;
  border: ${({ theme }) => theme.baseBorderStyle};
  background-color: white;
  border-top: none;
  padding: 15px 3px;
  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const CommentText = styled.span`
  font-size: 1.2em;
  white-space: pre-wrap;
  line-height: 23px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div``;

const CommentButton = styled.button`
  width: 60px;
  height: 30px;
  font-size: 12px;
  border-radius: 15px;
  border: ${({ theme }) => theme.baseBorderStyle};
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const DeleteButton = styled(CommentButton)`
  color: red;
  font-size: 12px;
  margin-right: 10px;
  font-family: 'Nanum Gothic', sans-serif;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const CreateDate = styled.span`
  font-size: 1em;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 100;
  margin-left: 10px;
  @media screen and (max-width: 768px) {
    padding-bottom: 10px;
    font-size: 15px;
  }
`;

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    padding-bottom: 10px;
    font-size: 15px;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 23px;
  margin-left: 10px;
`;

export default function Comment({
  id,
  text,
  userId,
  creatorId,
  createdAt,
  data,
  setRefetch,
  userObj,
}: ICommentProps) {
  const location = useLocation();
  const keyword = location.pathname.split('/');
  const onDeleteClick = async (id: string) => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      const findIndex = data.comments.findIndex(
        (item: IWorldCupCommentProps) => item.id === id
      );
      const newComments = [
        ...data.comments.slice(0, findIndex),
        ...data.comments.slice(findIndex + 1),
      ];
      await axios
        .put(`${BASE_URL}/world/${keyword[2]}`, {
          ...data,
          comments: newComments,
        })
        .then(() => setRefetch((prev) => !prev));
    }
  };

  return (
    <Container>
      <MessageWrapper>
        <UserWrapper>
          <UserInfoWrapper>
            <UserInfo>{userId}</UserInfo>
            {createdAt && <CreateDate>{dateFormater(createdAt)}</CreateDate>}
          </UserInfoWrapper>
          {String(userObj?.userId) === creatorId && (
            <ButtonWrapper>
              <DeleteButton onClick={() => onDeleteClick(id)}>
                삭제
              </DeleteButton>
            </ButtonWrapper>
          )}
        </UserWrapper>
        <CommentText>{text}</CommentText>
      </MessageWrapper>
    </Container>
  );
}
