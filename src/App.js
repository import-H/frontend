import React from "react";

import { Link } from "react-router-dom";

import Register from "./Pages/Register";
// styled-components 불러오기
import GlobalStyle from "./Styles/Globalstyle";

const App = () => {
  return (
    <div>
      <div>hi</div>
      {/* <Link to="/main">메인</Link> */}
      <GlobalStyle />
      <Register />
    </div>
  );
};

export default App;
