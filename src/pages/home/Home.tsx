import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
      {listArr.map((item: any) => (
        <div key={item.id}>
          <Link to={`/world/${item.id}`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
}
