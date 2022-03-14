import {
  BASE_URL,
  ERROR_MAX,
  ERROR_MIN,
  ERROR_REQUIRED,
  WORLD_CUP_ITEM,
} from 'constants/contants';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IUserObjProps } from 'utils/interface';
import { onEnterPress } from 'utils/utilFn';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const Title = styled.input.attrs({ type: 'text' })`
  height: 30px;
  border-radius: 7px;
  border: 1.5px solid #7982c9;
  position: relative;
  left: 0;
  right: 0;
  margin: 0 auto;
  &:focus {
    outline: none;
    border: 1.5px solid #424874;
  }
  @media only screen and (max-width: 1024px) {
    width: 300px;
    height: 50px;
    border-radius: 10px;
    font-size: 24px;
    margin-right: 30px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 24px;
    width: 200px;
    height: 50px;
    border-radius: 10px;
    margin-right: 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 50px;
  @media only screen and (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-content: center;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ItemInputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-right: 20px;
  @media only screen and (max-width: 1024px) {
    margin-right: 10px;
    &:first-child {
      order: 0;
    }
    &:nth-child(2) {
      order: 2;
    }
    &:nth-child(3) {
      order: 1;
    }
    &:last-child {
      order: 4;
    }
  }
  @media only screen and (max-width: 768px) {
    margin-right: 0px;
    left: -30px;
    &:first-child {
      order: 0;
    }
    &:nth-child(2) {
      order: 1;
    }
    &:nth-child(3) {
      order: 2;
    }
    &:last-child {
      order: 3;
    }
  }
`;

const ItemInput = styled.input.attrs({ type: 'text' })`
  height: 30px;
  border-radius: 7px;
  border: 1.5px solid #7982c9;
  &:focus {
    outline: none;
    border: 1.5px solid #424874;
  }
  @media only screen and (max-width: 1024px) {
    width: 200px;
    height: 50px;
    border-radius: 10px;
    margin-right: 30px;
    position: relative;
    left: 0;
    right: 0;
    margin: 0 auto;
    font-size: 24px;
  }
  @media only screen and (max-width: 768px) {
    width: 200px;
    height: 50px;
    border-radius: 10px;
    margin-right: 10px;
    font-size: 24px;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: flex-end;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    padding-bottom: 100px;
  }
  @media only screen and (max-width: 768px) {
    padding-bottom: 100px;
  }
`;

const CancelButton = styled.button`
  padding: 7px 14px;
  border-radius: 5px;
  color: #404675;
  background-color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f4efff;
  }
  &:focus {
    outline: none;
  }
`;

const SubmitInput = styled.input`
  padding: 7px 14px;
  border-radius: 5px;
  color: #404675;
  background-color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f4efff;
  }
  &:focus {
    outline: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const WorldCupText = styled.span`
  margin-left: 10px;
  width: 70px;
  font-size: 20px;
  left: 180px;
  color: #424874;
  font-weight: bold;
  position: absolute;
  @media only screen and (max-width: 1024px) {
    font-size: 16px;
    left: 320px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    left: 210px;
  }
`;

const ItemInfo = styled.span`
  font-size: 16px;
  color: white;
  font-weight: bold;
  @media only screen and (max-width: 1024px) {
    font-size: 24px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const ItemNumber = styled.span`
  color: white;
  margin-right: 2px;
  font-size: 14px;
  font-weight: bold;
  @media only screen and (max-width: 1024px) {
    font-size: 15px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ItemNumberWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  @media only screen and (max-width: 1024px) {
    margin-right: 10px;
  }
  @media only screen and (max-width: 768px) {
    margin-right: 10px;
  }
`;

interface IMakeProps {
  userObj: IUserObjProps | any;
}

export default function MakeWorldCup({ userObj }: IMakeProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (userObj === null) {
      navigate('/');
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    let listArr = [
      {
        id: uuidv4(),
        candidate: data.worldCupItem1,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem2,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem3,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem4,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem5,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem6,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem7,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem8,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem9,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem10,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem11,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem12,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem13,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem14,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem15,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
      {
        id: uuidv4(),
        candidate: data.worldCupItem16,
        roundWin: 0,
        roundLose: 0,
        champion: 0,
      },
    ];
    axios
      .post(`${BASE_URL}/world`, {
        title: data.title,
        list: listArr,
        id: uuidv4(),
        count: 0,
        createdAt: Date.now(),
        comments: [],
        creatorId: userObj.userId,
      })
      .then((res) => {
        navigate('/');
      })
      .catch((error) => console.error(error));
  };

  const onCancelClick = () => {
    navigate('/');
  };

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        onKeyPress={(e: React.KeyboardEvent<HTMLFormElement>) =>
          onEnterPress(e, handleSubmit(onSubmit))
        }
      >
        <TitleWrapper>
          <TitleContainer>
            <Title
              {...register('title', {
                required: ERROR_REQUIRED,
                minLength: { value: 1, message: ERROR_MIN },
                maxLength: {
                  value: 15,
                  message: '15글자 이하로 입력해주세요',
                },
              })}
            />
            <WorldCupText>월드컵</WorldCupText>
          </TitleContainer>
          {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        </TitleWrapper>
        <InputContainer>
          <ItemInputWrapper>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.1</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}1`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem1 && (
                <ErrorMessage>{errors.worldCupItem1?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.2</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}2`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem2 && (
                <ErrorMessage>{errors.worldCupItem2?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.3</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}3`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem3 && (
                <ErrorMessage>{errors.worldCupItem3?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.4</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}4`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem4 && (
                <ErrorMessage>{errors.worldCupItem4?.message}</ErrorMessage>
              )}
            </InputBox>
          </ItemInputWrapper>
          <ItemInputWrapper>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.5</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}5`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem5 && (
                <ErrorMessage>{errors.worldCupItem5?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.6</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}6`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem6 && (
                <ErrorMessage>{errors.worldCupItem6?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.7</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}7`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem7 && (
                <ErrorMessage>{errors.worldCupItem7?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.8</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}8`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem8 && (
                <ErrorMessage>{errors.worldCupItem8?.message}</ErrorMessage>
              )}
            </InputBox>
          </ItemInputWrapper>
          <ItemInputWrapper>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.9</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}9`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem9 && (
                <ErrorMessage>{errors.worldCupItem9?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.10</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}10`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem10 && (
                <ErrorMessage>{errors.worldCupItem10?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.11</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}11`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem11 && (
                <ErrorMessage>{errors.worldCupItem11?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.12</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}12`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem12 && (
                <ErrorMessage>{errors.worldCupItem12?.message}</ErrorMessage>
              )}
            </InputBox>
          </ItemInputWrapper>
          <ItemInputWrapper>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.13</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}13`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem13 && (
                <ErrorMessage>{errors.worldCupItem13?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.14</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}14`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem14 && (
                <ErrorMessage>{errors.worldCupItem14?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.15</ItemInfo>
                </ItemNumberWrapper>
                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}15`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem15 && (
                <ErrorMessage>{errors.worldCupItem15?.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <ItemWrapper>
                <ItemNumberWrapper>
                  <ItemNumber>NO</ItemNumber>
                  <ItemInfo>.16</ItemInfo>
                </ItemNumberWrapper>

                <ItemInput
                  {...register(`${WORLD_CUP_ITEM}16`, {
                    required: ERROR_REQUIRED,
                    minLength: {
                      value: 1,
                      message: ERROR_MIN,
                    },
                    maxLength: {
                      value: 20,
                      message: ERROR_MAX,
                    },
                  })}
                />
              </ItemWrapper>
              {errors.worldCupItem16 && (
                <ErrorMessage>{errors.worldCupItem16?.message}</ErrorMessage>
              )}
            </InputBox>
          </ItemInputWrapper>
        </InputContainer>
        <ButtonWrapper>
          <CancelButton onClick={onCancelClick}>취소하기</CancelButton>
          <SubmitInput type="submit" value="생성하기" />
        </ButtonWrapper>
      </Form>
    </Container>
  );
}
