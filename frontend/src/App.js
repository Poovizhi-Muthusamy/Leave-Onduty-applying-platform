// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './sidebar';
import Home from './Home';
import Navbar from './navbar';
import Login from './login';
import Apply from './student';
import Admin from './Admin';
import './apply.css'

function App() {
  return (
    <>
      <div className="d-flex flex-column" style={{ height: '100vh' }}>
        <div className='newbg'><Navbar /></div>
        
        <div className="d-flex flex-row flex-grow-1">
          <Sidebar />
          <div className="content flex-grow-1 p-3">
         <div className='side'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/student/:username" element={<Apply />} />
            </Routes>
            </div>
         
          </div>
        </div>
      </div>
      </>
    
  );
}

export default App;
