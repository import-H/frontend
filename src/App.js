import React from "react";

import { Link } from "react-router-dom";

import Register from "./Pages/Register";
// styled-components 불러오기
import GlobalStyle from "./Styles/Globalstyle";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Register />
      {/* <Link to="/register">Register</Link> */}
    </div>
  );
};

export default App;
