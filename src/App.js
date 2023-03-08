import React, { useEffect } from 'react';
import { HashRouter, Link, Route, Routes } from "react-router-dom"
import Header from "./features/header"
import Home from "./features/home"
import Auth from "./features/auth"
import Settings from './features/settings';
import Article from './features/article';
import Editor from './features/editor';
import { useDispatch } from 'react-redux';
import { getUserToken } from './features/auth/authSlice';
import agent from './common/agent';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = window.localStorage.getItem("jwt")
    dispatch(getUserToken(token))
    agent.setToken(token)
  }, [])
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Auth isRegistered />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/article/:slug" element={<Article />} />
      </Routes>
      <footer>
        <div class="container">
          <Link to="/" >conduit</Link>
          <span class="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp;
            design licensed under MIT.
          </span>
        </div>
      </footer>
    </HashRouter>
  );
}

export default App;
