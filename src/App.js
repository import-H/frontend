import React from "react";
import './App.css'
import { Route, Routes } from "react-router-dom";
import NavBar from "./Pages/Sections/NavBar";
import { Main, Login, Register, Board } from "./Pages";

const App = () => {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      {/* <Link to="/main">메인</Link>
      <Link to="/register">회원가입</Link>
      <Link to="/login">로그인</Link> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </div>
  );
};

export default App;
