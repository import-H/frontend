import React from "react";
import GlobalStyle from "./Styles/Globalstyle";
import { MainContainer, Container } from "./Styles/theme";
import Banner from "./Components/Banner";
import Main from "./Pages/Main";

const App = () => {
  return (
    <MainContainer>
      <div style={{ width: "100%" }}>
        <GlobalStyle />
        <Banner />
        <Container style={{ marginTop: 0 }}>
          <Main />
        </Container>        
      </div>
    </MainContainer>
  );
};

export default App;
