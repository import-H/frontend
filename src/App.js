import React from "react";
import GlobalStyle from "./styles/Globalstyle";
import { Container } from "./styles/theme";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <Container>
      <GlobalStyle />
      랜딩페이지
    </Container>
  );
};

export default App;
