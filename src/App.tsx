import React, { useEffect, useState } from 'react';
import Router from 'router/Router';
import { IUser } from 'utils/interface';

function App() {
  const [userObj, setUserObj] = useState<any>({});
  console.log(userObj);
  return <Router userObj={userObj} setUserObj={setUserObj} />;
}

export default App;
