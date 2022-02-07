import React from "react";
import GlobalStyle from "./Styles/Globalstyle";
import { Container } from "./Styles/theme";
import Banner from "./Components/Banner";

const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <Banner />
    </Container>
  );
};

export default App;
