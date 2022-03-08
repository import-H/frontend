import React from "react";

// style
import GlobalStyle from "../../styles/Globalstyle";
import { Container } from "../../styles/theme";
import OAuthC from "../../containters/socialAuth/OAuthC";

const OAuth = () => {
  return (
    <Container>
      <GlobalStyle />
      <OAuthC />
    </Container>
  );
};

export default OAuth;
