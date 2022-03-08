// react
import React from "react";

// styled-components
import GlobalStyle from "../../styles/Globalstyle.js";
import { FlexContainer } from "../../styles/theme.js";

// components
import LoginFormC from "../../containters/login/LoginFormC";

// auth form으로 변경해도 좋을듯(공통 기능 많아서)
const Login = () => {
  return (
    <FlexContainer>
      <GlobalStyle />
      <LoginFormC />
    </FlexContainer>
  );
};

export default Login;
