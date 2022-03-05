import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WorldCupTitle = styled(Link)`
  font-size: 30px;
  /* text-decoration: none; */
`;

export default function Home() {
  const [listArr, setListArr] = useState<any>([{}]);
  useEffect(() => {
    axios.get('http://localhost:4000/world').then((res) => {
      console.log(res);
      setListArr(res.data);
    });
  }, []);
  return (
    <div>
      {listArr.map((item: any, idx: number) => (
        <div key={idx}>
          <WorldCupTitle to={`/world/${item.id}`}>{item.title}</WorldCupTitle>
        </div>
      ))}
    </div>
  );
}
