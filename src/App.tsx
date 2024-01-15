import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, ScrollRestoration } from 'react-router-dom'
import Home from 'pages/home';
import Posts from 'pages/posts';
import SinglePost from 'pages/post';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home message='Hola from' />} />
        <Route path='/posts' element={<Posts message='Hallo from' />} />
        <Route path='/posts/:postId' element={<SinglePost message='Zdravo od' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
