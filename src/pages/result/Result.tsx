// import React, { useEffect, useState } from 'react';

// import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
// import { GUEST_ICON, GUEST_NAME } from '../../constants/contants';
// import { onEnterPress } from 'utils/utilFn';
// import Comment from './components/Comment';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 600px;
//   height: 100%;
//   border: ${({ theme }) => theme.baseBorderStyle};
//   padding: 17px;
// `;

// const Input = styled.textarea`
//   height: 55px;
//   border: none;
//   width: 100%;
//   font-size: 1.6em;
//   resize: none;
//   margin-bottom: 10px;
//   &::placeholder {
//     font-size: 2em;
//     border: none;
//     width: 100%;
//   }
//   &:placeholder-shown {
//     font-size: 1em;
//     width: 100%;
//   }
//   &:focus {
//     outline-width: 0;
//   }
//   &:-webkit-input-placeholder {
//     font-size: 1.6em;
//     width: 100%;
//   }
//   &:focus::placeholder {
//     border: none;
//     width: 100%;
//   }
// `;

// const ToDoWelcome = styled.div`
//   font-size: 1.6em;
//   font-weight: 600;
//   margin-bottom: 30px;
// `;

// const SubmitInput = styled.input<{ isMessage: boolean }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: none;
//   width: 70px;
//   height: 35px;
//   border-radius: 17.5px;
//   background: none;
//   color: white;
//   font-weight: 600;
//   font-size: 1.2em;
//   cursor: ${({ isMessage }) => (isMessage ? 'pointer' : 'click')};
//   background-color: ${({ theme, isMessage }) =>
//     isMessage ? theme.mainBlueColor : theme.mainWhiteBlueColor};
// `;

// const InputWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const ToDosContainer = styled.ul``;

// export default function Result() {
//   const [toDos, setToDos] = useState('');
//   const [data, setData] = useState<any>([{}]);
//   const [comment, setComment] = useState<any>([]);
//   const location = useLocation();
//   const keyword = location.pathname.split('/');

//   useEffect(() => {
//     axios.get(`http://localhost:4000/world/${keyword[2]}`).then((res) => {
//       setData(res.data);
//       setComment(res.data.comments);
//     });
//   }, []);

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:4000/world/${keyword[2]}`, {
//         ...data,
//         comments: [
//           ...data.comments,
//           {
//             id: uuidv4(),
//             text: toDos,
//             createdAt: Date.now(),
//             creatorId: userObj.uid,
//             userId: userObj.displayName ? userObj.displayName : GUEST_NAME,
//             userImage:
//               userObj.photoURL !== null ? userObj.photoURL : GUEST_ICON,
//           },
//         ],
//       })
//       .then((res) => setRefetch((prev) => !prev))
//       .catch((error) => console.log(error));
//     setToDos('');
//   };
//   const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const {
//       target: { value },
//     } = e;
//     setToDos(value);
//   };
//   return (
//     <Container>
//       {userObj && (
//         <Form onSubmit={onSubmit} onKeyPress={(e) => onEnterPress(e, onSubmit)}>
//           <ToDoWelcome>댓글</ToDoWelcome>
//           <InputWrapper>
//             <Input
//               onChange={onChange}
//               placeholder="댓글을 남겨주세요"
//               value={toDos}
//             />
//             <SubmitInput
//               isMessage={toDos !== ''}
//               type="submit"
//               value="보내기"
//             />
//           </InputWrapper>
//         </Form>
//       )}

//       <ToDosContainer>
//         {comment?.map((item: any) => (
//           <Comment
//             key={item.id}
//             id={item.id}
//             text={item.text}
//             photoURL={item.photoURL}
//             userId={item.userId}
//             createdAt={item.createdAt}
//             userImage={item.userImage}
//             data={data}
//             setRefetch={setRefetch}
//           />
//         ))}
//       </ToDosContainer>
//     </Container>
//   );
// }
import React from 'react';

export default function Result() {
  return <div>Result</div>;
}
