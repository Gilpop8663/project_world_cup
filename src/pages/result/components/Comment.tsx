import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IUserObjProps } from 'utils/interface';
import { dateFormater } from 'utils/utilFn';

interface IToDoProps {
  id: string;
  text: string;
  userId: string;
  createdAt: number | Date;
  creatorId: string;
  data: any;
  userObj: IUserObjProps | any;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.li`
  display: flex;
  border: ${({ theme }) => theme.baseBorderStyle};
  background-color: white;
  border-top: none;
  padding: 15px;
`;

const ToDoText = styled.span`
  font-size: 1.2em;
  white-space: pre-wrap;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div``;

const ToDoBtn = styled.button`
  width: 60px;
  height: 30px;
  font-size: 0.8em;
  border-radius: 15px;
  border: ${({ theme }) => theme.baseBorderStyle};
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const DeleteButton = styled(ToDoBtn)`
  color: red;
  margin-right: 10px;
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
`;

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
}: IToDoProps) {
  const location = useLocation();
  const keyword = location.pathname.split('/');
  const onDeleteClick = async (id: string) => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      const findIndex = data.comments.findIndex((item: any) => item.id === id);
      const newComments = [
        ...data.comments.slice(0, findIndex),
        ...data.comments.slice(findIndex + 1),
      ];
      await axios
        .put(`http://localhost:4000/world/${keyword[2]}`, {
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
          {userObj.userId === creatorId && (
            <ButtonWrapper>
              <DeleteButton onClick={() => onDeleteClick(id)}>
                삭제
              </DeleteButton>
            </ButtonWrapper>
          )}
        </UserWrapper>
        <ToDoText>{text}</ToDoText>
      </MessageWrapper>
    </Container>
  );
}
