import React from 'react';
import './App.css';

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
  }
  getUser('test@test.com');
  return (
    <div className="App">
      hello world
    </div>
  );
}

export default App;
