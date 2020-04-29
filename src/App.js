import React from 'react';
import logo from './logo.svg';
import './App.css';
import News from "./news"

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    <News/>
    </header>
  </div>
  );
}

export default App;
