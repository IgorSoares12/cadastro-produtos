import React from 'react';
import Rotas from './rotas';
import Navbar from './components/navbar';
import {HashRouter} from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <div className="container">
        <Navbar />
        <Rotas />                
      </div>
    </HashRouter>
  );
}

export default App;