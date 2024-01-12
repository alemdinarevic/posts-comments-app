import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from 'pages/home';
import Posts from 'pages/posts';
import SinglePost from 'pages/post';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/:postId' element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
