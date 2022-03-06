import axios from 'axios';
import WorldCupList from 'components/WorldCupList';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IWorldCupProps } from 'utils/interface';

const Container = styled.div``;

export default function Home() {
  const [listArr, setListArr] = useState<any>([{}]);
  useEffect(() => {
    axios.get('http://localhost:4000/world').then((res) => {
      setListArr(
        res.data.sort(
          (a: IWorldCupProps, b: IWorldCupProps) => b.count - a.count
        )
      );
    });
  }, []);

  return (
    <Container>
      <WorldCupList data={listArr} />
    </Container>
  );
}
