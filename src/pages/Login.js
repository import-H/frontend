// react
import React, { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle.js";
import { Button, Input, FlexContainer } from "../Styles/theme.js";

// react-router-dom
import { useNavigate } from "react-router-dom";
import { getProfile } from "../redux/slices/userSlice";

import SocialAuth from "../components/SocialAuth";
import LoginFormC from "../containters/login/LoginFormC";

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
