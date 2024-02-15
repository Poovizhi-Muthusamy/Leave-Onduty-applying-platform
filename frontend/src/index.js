import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './login'; 
import Sidebar from './sidebar';
import Home from './Home';
import Navbar from './navbar';
import Apply from './student';
import Admin from './Admin';


const App2 = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/navbar" element={<Navbar/>} />
        <Route path="/sidebar" element={<Sidebar/>} />
        <Route path="/student" element={<Apply/>}/>
        <Route path="/Admin" element={<Admin/>}/>

      </Routes>
    </Router>
  );
};

ReactDOM.render(<App2 />, document.getElementById('root'));
