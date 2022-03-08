import React from "react";

// head
import { Helmet } from "react-helmet";

// style
import GlobalStyle from "./styles/Globalstyle";
import { MainContainer, Container } from "./styles/theme";

// components
import Banner from "./components/main/Banner";
import Main from "./pages/Main";

const App = () => {
  return (
    <MainContainer>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {/* <div style={{ width: "100%" }}>
        <GlobalStyle />
        <Banner />
        <Container style={{ marginTop: 0 }}>
          <Main />
        </Container>
      </div> */}
    </MainContainer>
  );
};

export default App;
