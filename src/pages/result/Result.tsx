import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { dbService } from '../../firebase';
import styled from 'styled-components';
import {
  CREATED_AT,
  CREATOR_ID,
  GUEST_ICON,
  GUEST_NAME,
  COMMENT,
} from '../../constants/contants';
import { onEnterPress } from 'utils/utilFn';
import Comment from './components/Comment';

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
  font-size: 1.6em;
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
  font-size: 1.6em;
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
  font-size: 1.2em;
  cursor: ${({ isMessage }) => (isMessage ? 'pointer' : 'click')};
  background-color: ${({ theme, isMessage }) =>
    isMessage ? theme.mainBlueColor : theme.mainWhiteBlueColor};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToDosContainer = styled.ul``;

interface IResult {
  userObj?: any;
}

export default function Result({ userObj }: IResult) {
  const [toDos, setToDos] = useState('');
  const [toDoList, setToDoList] = useState<any>([]);

  useEffect(() => {
    const q = query(
      collection(dbService, COMMENT),
      orderBy(CREATED_AT, 'desc')
    );
    onSnapshot(q, async (snapshot) => {
      const toDosArr = snapshot.docs.map((item: any) => {
        return {
          id: item.id,
          ...item.data(),
        };
      });
      setToDoList(toDosArr);
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(collection(dbService, COMMENT), {
      text: toDos,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      userId: userObj.displayName ? userObj.displayName : GUEST_NAME,
      userImage: userObj.photoURL !== null ? userObj.photoURL : GUEST_ICON,
    });
    setToDos('');
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    setToDos(value);
  };
  return (
    <Container>
      {userObj && (
        <Form onSubmit={onSubmit} onKeyPress={(e) => onEnterPress(e, onSubmit)}>
          <ToDoWelcome>To Do List</ToDoWelcome>(
          <InputWrapper>
            <Input
              onChange={onChange}
              placeholder="할 일을 적어주세요"
              value={toDos}
            />
            <SubmitInput
              isMessage={toDos !== ''}
              type="submit"
              value="보내기"
            />
          </InputWrapper>
          )
        </Form>
      )}
      <ToDosContainer>
        {toDoList.map((item: any) => (
          <Comment
            key={item.id}
            id={item.id}
            text={item.text}
            photoURL={item.photoURL}
            userId={item.userId}
            createdAt={item.createdAt}
            userImage={item.userImage}
          />
        ))}
      </ToDosContainer>
    </Container>
  );
}
