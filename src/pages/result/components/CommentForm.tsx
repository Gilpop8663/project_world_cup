import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { onEnterPress } from 'utils/utilFn';
import Comment from './Comment';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { GUEST_ICON, GUEST_NAME } from '../../../constants/contants';
import { IUserObjProps } from 'utils/interface';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 100%;
  border: ${({ theme }) => theme.baseBorderStyle};
  padding: 17px;
`;

const Input = styled.textarea`
  height: 55px;
  border: none;
  width: 100%;
  font-size: 1.2em;
  resize: none;
  margin-bottom: 10px;
  &::placeholder {
    font-size: 2em;
    border: none;
    width: 100%;
  }
  &:placeholder-shown {
    font-size: 1em;
    width: 100%;
  }
  &:focus {
    outline-width: 0;
  }
  &:-webkit-input-placeholder {
    font-size: 1.6em;
    width: 100%;
  }
  &:focus::placeholder {
    border: none;
    width: 100%;
  }
`;

const ToDoWelcome = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 30px;
`;

const SubmitInput = styled.input<{ isMessage: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 70px;
  height: 35px;
  border-radius: 17.5px;
  background: none;
  color: white;
  font-weight: 600;
  font-size: 1em;
  cursor: ${({ isMessage }) => (isMessage ? 'pointer' : 'click')};
  background-color: ${({ theme, isMessage }) =>
    isMessage ? theme.mainBlueColor : theme.mainWhiteBlueColor};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageContainer = styled.ul``;

export default function CommentForm({ userObj }: IUserObjProps) {
  const [message, setMessage] = useState('');
  const [data, setData] = useState<any>([{}]);
  const [comment, setComment] = useState<any>([]);
  const [refetch, setRefetch] = useState(false);
  const location = useLocation();
  const keyword = location.pathname.split('/');

  useEffect(() => {
    axios.get(`http://localhost:4000/world/${keyword[2]}`).then((res) => {
      setData(res.data);
      setComment(res.data.comments);
    });
  }, [refetch]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    axios
      .put(`http://localhost:4000/world/${keyword[2]}`, {
        ...data,
        comments: [
          ...data.comments,
          {
            id: uuidv4(),
            text: message,
            createdAt: Date.now(),
            creatorId: userObj.userId,
            userId: userObj.userName ? userObj.userName : GUEST_NAME,
            userImage: GUEST_ICON,
          },
        ],
      })
      .then((res) => setRefetch((prev) => !prev))
      .catch((error) => console.log(error));
    setMessage('');
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    setMessage(value);
  };
  return (
    <Container>
      {Object.keys(userObj).length === 3 && (
        <Form onSubmit={onSubmit} onKeyPress={(e) => onEnterPress(e, onSubmit)}>
          <ToDoWelcome>댓글</ToDoWelcome>
          <InputWrapper>
            <Input
              onChange={onChange}
              placeholder="댓글을 남겨주세요"
              value={message}
            />
            <SubmitInput
              isMessage={message !== ''}
              type="submit"
              value="보내기"
            />
          </InputWrapper>
        </Form>
      )}

      <MessageContainer>
        {comment?.map((item: any) => (
          <Comment
            key={item.id}
            id={item.id}
            text={item.text}
            photoURL={item.photoURL}
            userId={item.userId}
            creatorId={item.creatorId}
            createdAt={item.createdAt}
            userImage={item.userImage}
            data={data}
            setRefetch={setRefetch}
            userObj={userObj}
          />
        ))}
      </MessageContainer>
    </Container>
  );
}
