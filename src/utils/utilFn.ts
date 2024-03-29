import { FormEvent } from 'react';

export const dateFormater = (time: number | Date) => {
  const oldYear = new Date(time).getFullYear();
  const nowYear = new Date(Date.now()).getFullYear();
  const oldMonth = new Date(time).toString().slice(3, 7);
  const oldDay = new Date(time).getDate();
  const second = (Date.now() - Number(time)) / 1000;
  const minute = second / 60;
  const hour = minute / 60;
  const day = hour / 24;
  if (minute < 1) {
    return 'Now';
  } else if (minute > 1 && hour < 1) {
    return `${minute.toFixed(0)}분 전`;
  } else if (hour > 1 && day < 1) {
    return `${hour.toFixed(0)}시간 전`;
  } else if (day > 1 && oldYear === nowYear) {
    return `${oldMonth} ${oldDay}`;
  } else if (day > 1 && oldYear !== nowYear) {
    return `${oldMonth} ${oldDay}, ${oldYear}`;
  }
};

export const onEnterPress = (
  e: React.KeyboardEvent<HTMLFormElement>,
  sumbitFn: (e: FormEvent<HTMLFormElement>) => void
) => {
  if (e.key === 'Enter' && e.shiftKey) {
    return;
  } else if (e.key === 'Enter') {
    sumbitFn(e);
  }
};
