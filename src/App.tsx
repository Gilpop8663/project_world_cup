import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authService, firebaseApp } from './firebase';
import Router from 'router/Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(authService.currentUser);

  console.log(isLoggedIn);
  return <Router isLoggedIn={isLoggedIn} />;
}

export default App;
