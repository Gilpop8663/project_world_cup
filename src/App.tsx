import React, { useEffect, useState } from 'react';
import { authService, firebaseApp } from './firebase';
import Router from 'router/Router';

function App() {
  const [userObj, setUserObj] = useState<object | null>(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
    });
  }, []);

  // console.log(userObj);
  return (
    <Router
      refetch={refetch}
      userObj={userObj}
      setRefetch={setRefetch}
      isLoggedIn={Boolean(userObj)}
    />
  );
}

export default App;
