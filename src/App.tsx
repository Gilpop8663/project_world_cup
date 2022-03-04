import React, { useEffect, useState } from 'react';
import { authService, firebaseApp } from './firebase';
import Router from 'router/Router';

function App() {
  const [userObj, setUserObj] = useState<object | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
    });
  }, []);

  console.log(userObj);
  return <Router userObj={userObj} isLoggedIn={Boolean(userObj)} />;
}

export default App;
