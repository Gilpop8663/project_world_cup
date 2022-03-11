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
  justify-content: center;
  align-items: center;
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
  &:focus {
    outline: none;
    border: 1.5px solid #424874;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ItemInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;

const ItemInput = styled.input.attrs({ type: 'text' })`
  height: 30px;
  border-radius: 7px;
  border: 1.5px solid #7982c9;
  &:focus {
    outline: none;
    border: 1.5px solid #424874;
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
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  align-items: center;
  margin-bottom: 10px;
`;

const WorldCupText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const ItemInfo = styled.span`
  font-size: 16px;
  color: white;
  font-weight: bold;
  margin-right: 3px;
`;

const ItemNumber = styled.span`
  color: white;
  font-size: 8px;
  font-weight: bold;
  margin-right: 5px;
`;

const ItemNumberWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

interface IMakeProps {
  userObj: IUserObjProps | any;
}

export default function MakeWorldCup({ userObj }: IMakeProps) {
  const navigate = useNavigate();
  console.log(Boolean(userObj.userId));
  useEffect(() => {
    if (Boolean(!userObj.userId)) {
      navigate('/');
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
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
        console.log('성공');
        navigate('/');
      })
      .catch((error) => console.log(error));
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
                  <ItemInfo>1</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>2</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>3</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>4</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>5</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>6</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>7</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>8</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>9</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>10</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>11</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>12</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>13</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>14</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>15</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
                  <ItemInfo>16</ItemInfo>
                  <ItemNumber>NO</ItemNumber>
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
