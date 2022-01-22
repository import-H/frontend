import React from "react";
import GlobalStyle from "./Styles/Globalstyle";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-width: 300px;
  padding: 20px 25px;
  display: flex;
  justify-content: center;
`;

const App = () => {
  return (
    <Container>
      <GlobalStyle>        
        랜딩페이지
      </GlobalStyle>
    </Container>
  );
};

export default App;
