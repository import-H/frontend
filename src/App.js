import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Link to="/main">메인</Link>
      <Link to="/register">회원가입</Link>
      <Link to="/login">로그인</Link>
    </div>
  );
};

export default App;
