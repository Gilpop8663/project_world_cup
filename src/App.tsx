import { useState } from 'react';
import Router from 'router/Router';
import { IUserObj } from 'utils/interface';

function App() {
  const [userObj, setUserObj] = useState<IUserObj>(null);
  return <Router userObj={userObj} setUserObj={setUserObj} />;
}

export default App;
