import React from "react";
import GlobalStyle from "./Styles/Globalstyle";
import { Container } from "./Styles/theme";

const App = () => {
  return (
    <Container>
      <GlobalStyle />        
      <div style={{marginTop: '5%'}}>랜딩페이지</div>
    </Container>
  );
};

export default App;
