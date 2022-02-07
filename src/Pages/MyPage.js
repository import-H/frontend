import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle.js";
import { Button, Input, Container } from "../Styles/theme.js";

// react-router-dom
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  return (
      <Container>
          <GlobalStyle />
          My Page
      </Container>
  )
}

export default MyPage;
