import {
  ERROR_MAX,
  ERROR_MIN,
  ERROR_REQUIRED,
  WORLD_CUP_ITEM,
} from 'constants/contants';
import { dbService } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50vw;
  align-items: center;
  padding-top: 50px;
`;

const Title = styled.input.attrs({ type: 'text' })``;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const ItemInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const ItemInput = styled.input.attrs({ type: 'text' })``;

const InputBox = styled.div`
  margin: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitInput = styled.input``;

const firstArr = [1, 2, 3, 4];
const secondArr = [5, 6, 7, 8];
const thirdArr = [9, 10, 11, 12];
const fourthArr = [13, 14, 15, 16];

export default function MakeWorldCup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    let listArr = [
      { id: uuidv4(), candidate: data.worldCupItem1, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem2, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem3, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem4, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem5, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem6, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem7, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem8, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem9, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem10, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem11, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem12, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem13, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem14, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem15, score: 0 },
      { id: uuidv4(), candidate: data.worldCupItem16, score: 0 },
    ];
    const docRef = await addDoc(collection(dbService, 'wolrdCup'), {
      title: data.title,
      list: listArr,
      id: uuidv4(),
      count: 0,
    });
    navigate('/');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          {...register('title', {
            required: ERROR_REQUIRED,
            minLength: { value: 3, message: ERROR_MIN },
          })}
        />
        {errors.title && <p>{errors.title?.message}</p>}
        <InputContainer>
          <ItemInputWrapper>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}1`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem1 && <p>{errors.worldCupItem1?.message}</p>}
            </InputBox>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}2`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem2 && <p>{errors.worldCupItem2?.message}</p>}
            </InputBox>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}3`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem3 && <p>{errors.worldCupItem3?.message}</p>}
            </InputBox>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}4`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem4 && <p>{errors.worldCupItem4?.message}</p>}
            </InputBox>
          </ItemInputWrapper>
          <ItemInputWrapper>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}5`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem5 && <p>{errors.worldCupItem5?.message}</p>}
            </InputBox>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}6`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem6 && <p>{errors.worldCupItem6?.message}</p>}
            </InputBox>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}7`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem7 && <p>{errors.worldCupItem7?.message}</p>}
            </InputBox>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}8`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem8 && <p>{errors.worldCupItem8?.message}</p>}
            </InputBox>
          </ItemInputWrapper>
          <ItemInputWrapper>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}9`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem9 && <p>{errors.worldCupItem9?.message}</p>}
            </InputBox>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}10`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem10 && <p>{errors.worldCupItem10?.message}</p>}
            </InputBox>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}11`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem11 && <p>{errors.worldCupItem11?.message}</p>}
            </InputBox>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}12`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem12 && <p>{errors.worldCupItem12?.message}</p>}
            </InputBox>
          </ItemInputWrapper>
          <ItemInputWrapper>
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}13`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem13 && <p>{errors.worldCupItem13?.message}</p>}
            </InputBox>{' '}
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}14`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem14 && <p>{errors.worldCupItem14?.message}</p>}
            </InputBox>{' '}
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}15`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem15 && <p>{errors.worldCupItem15?.message}</p>}
            </InputBox>{' '}
            <InputBox>
              <ItemInput
                {...register(`${WORLD_CUP_ITEM}16`, {
                  required: ERROR_REQUIRED,
                  minLength: {
                    value: 3,
                    message: ERROR_MIN,
                  },
                  maxLength: {
                    value: 10,
                    message: ERROR_MAX,
                  },
                })}
              />
              {errors.worldCupItem16 && <p>{errors.worldCupItem16?.message}</p>}
            </InputBox>
          </ItemInputWrapper>
        </InputContainer>
        <SubmitInput type="submit" value="보내기" />
      </Form>
    </Container>
  );
}
