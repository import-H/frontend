// react
import React from "react";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle";
import { FlexContainer } from "../Styles/theme";

import SocialAuth from "../components/SocialAuth";
import RegisterFormC from "../containters/register/RegisterFormC";

// auth form으로 변경해도 좋을듯(공통 기능 많아서)
const Register = () => {
  return (
    <FlexContainer>
      <GlobalStyle />
      <RegisterFormC />
    </FlexContainer>
  );
};

export default Register;
