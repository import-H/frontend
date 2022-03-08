// react
import React from "react";

// style
import styled, { keyframes } from "styled-components";
import { MainContainer, Container } from "../styles/theme";
import GlobalStyle from "../styles/Globalstyle";

// components
import MainC from "../containters/main/MainC";

const Main = () => {
  return (
    <MainContainer>
      <GlobalStyle />
      <MainC />
    </MainContainer>
  );
};

export default Main;
