import React from "react";
import GlobalStyle from "./Styles/Globalstyle";
import { Container } from "./Styles/theme";
import Banner from "./Components/Banner";
import Main from "./Pages/Main";

const App = () => {
  return (
    <Container>
      <div style={{ width: "100%" }}>
        <GlobalStyle />
        <Banner />
        <Main />
      </div>
    </Container>
  );
};

export default App;
