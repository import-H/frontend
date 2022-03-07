import React from "react";

// style
import GlobalStyle from "../../Styles/Globalstyle";
import { Container } from "../../Styles/theme";
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
