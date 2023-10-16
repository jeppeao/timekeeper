import React from 'react';
import './App.css';
import Topbar from './components/topbar/topbar';
import LoginView from './components/loginView/loginView';
const SERVER_URL = "http://localhost:3001";


function App() {
  const getUser = async (email: string) => {
    fetch(SERVER_URL + "/getUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email})
    })
    .then(response => {
      return response.text();
    })
    .then(response => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    })
  }

  const login = async(email: string, password: string) => {
    fetch(SERVER_URL + "/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    })
    .then(response => {
      return response.text();
    })
    .then(response => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    })
  }

  try {
    getUser('test@test.com');
  }
  catch (e) {
    console.log(e);
  }

  try {
    login("test@test.com", "ddddd")
    .then(() => {
      getUser('test@test.com');
    })
    .catch(e => console.log(e));
  }
  catch (e) {
    console.log(e);
  }

  return (
    <div className="App">
      <Topbar/>
      <LoginView/>
    </div>
  );
}

export default App;
