import React, { useState } from "react";
import { Link } from "react-router-dom";

import Register from "./Pages/Register";
// styled-components 불러오기
import GlobalStyle from "./Styles/Globalstyle";

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
