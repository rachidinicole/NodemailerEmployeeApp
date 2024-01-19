import React  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from './components/Auth/Register';

function App() {

  return (
   <BrowserRouter>
   <Routes>
   <Route exact path="/" element={<Login/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
   </Routes>
   
   </BrowserRouter>
  );
}

export default App;
