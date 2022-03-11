import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { onEnterPress } from 'utils/utilFn';
import Comment from './Comment';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { BASE_URL, GUEST_NAME } from '../../../constants/contants';
import {
  IUserObjProps,
  IWorldCupCommentProps,
  IWorldCupProps,
} from 'utils/interface';

const Container = styled.div<{ isLoading: boolean }>`
  padding-top: 23px;
  width: 100%;
  display: ${({ isLoading }) => (isLoading ? 'none' : 'flex')};
  flex-direction: column;
  padding-right: 23px;
  @media screen and (max-width: 768px) {
    padding: 23px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => theme.baseBorderStyle};
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 2px solid #7982c9;
`;

const Input = styled.textarea`
  height: 55px;
  border: none;
  width: 100%;
  font-size: 1.2em;
  resize: none;
  margin-bottom: 10px;
  &::placeholder {
    font-size: 1.2em;
    border: none;
    width: 100%;
    background-color: white;
  }
  &:placeholder-shown {
    font-size: 1.2em;
    width: 100%;
    background-color: white;
  }
  &:focus {
    outline-width: 0;
  }
  &:-webkit-input-placeholder {
    font-size: 1.2em;
    width: 100%;
  }
  &:focus::placeholder {
    border: none;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const CommentTitle = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 30px;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const SubmitInput = styled.input<{ isMessage: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 80px;
  height: 30px;
  border-radius: 17.5px;
  background: none;
  color: white;
  font-weight: 600;
  font-size: 0.8em;
  cursor: ${({ isMessage }) => (isMessage ? 'pointer' : 'click')};
  background-color: ${({ isMessage }) => (isMessage ? '#8A94E1' : '#A6B1E1')};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const MessageContainer = styled.ul<{ isData: boolean }>`
  overflow-y: scroll;
  border-radius: 6px;
  border: ${({ isData }) => (isData ? '2px solid #7982c9' : 'none')};
  &::-webkit-scrollbar {
    border-radius: 6px;
    width: 5px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #424874;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: grey;
    box-shadow: inset 0px 0px 5px white;
  }
`;

export default function CommentForm({ userObj }: IUserObjProps) {
  const [message, setMessage] = useState('');
  const [data, setData] = useState<IWorldCupProps>();
  const [comment, setComment] = useState<IWorldCupCommentProps[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const keyword = location.pathname.split('/');

  useEffect(() => {
    axios.get(`${BASE_URL}/world/${keyword[2]}`).then((res) => {
      setData(res.data);
      setComment(res.data.comments);
      setLoading(false);
    });
  }, [refetch]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    axios
      .put(`${BASE_URL}/world/${keyword[2]}`, {
        ...data,
        comments: [
          {
            id: uuidv4(),
            text: message,
            createdAt: Date.now(),
            creatorId: userObj.userId,
            userId: userObj.userName ? userObj.userName : GUEST_NAME,
          },
          ...data.comments,
        ],
      })
      .then((res) => setRefetch((prev) => !prev))
      .catch((error) => console.error(error));
    setMessage('');
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    setMessage(value);
  };
  return (
    <Container isLoading={loading}>
      <Form onSubmit={onSubmit} onKeyPress={(e) => onEnterPress(e, onSubmit)}>
        <CommentTitle>댓글</CommentTitle>
        <InputWrapper>
          <Input
            disabled={Object.keys(userObj).length !== 3}
            minLength={1}
            maxLength={100}
            onChange={onChange}
            placeholder={
              Object.keys(userObj).length !== 3
                ? '로그인 후에 입력 가능합니다'
                : '댓글을 입력해주세요'
            }
            value={message}
          />
          <SubmitInput
            isMessage={message !== ''}
            type="submit"
            value="보내기"
          />
        </InputWrapper>
      </Form>

      <MessageContainer isData={comment.length > 0}>
        {comment?.map((item: any) => (
          <Comment
            key={item.id}
            id={item.id}
            text={item.text}
            userId={item.userId}
            creatorId={item.creatorId}
            createdAt={item.createdAt}
            data={data}
            setRefetch={setRefetch}
            userObj={userObj}
          />
        ))}
      </MessageContainer>
    </Container>
  );
}
