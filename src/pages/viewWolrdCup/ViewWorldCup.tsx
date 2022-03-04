import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from '../../firebase';
import { CREATED_AT, WORLD_CUP } from 'constants/contants';

export default function ViewWorldCup() {
  const [listArr, setListArr] = useState<any>([]);
  useEffect(() => {
    const q = query(
      collection(dbService, WORLD_CUP),
      orderBy(CREATED_AT, 'desc')
    );
    onSnapshot(q, async (snapshot) => {
      const messageArr = snapshot.docs.map((item: any) => {
        return {
          id: item.id,
          ...item.data(),
        };
      });
      setListArr(messageArr);
    });
  }, []);
  console.log(listArr);
  return <div>viewWorldCup</div>;
}
