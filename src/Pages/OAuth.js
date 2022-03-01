import React, { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { oauth } from "../reducers/slices/authSlice";

// react-router-dom
import { useParams, useNavigate } from "react-router-dom";

// style
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle";
import { Container } from "../Styles/theme";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = useParams().provider;

  useEffect(async () => {
    const code = new URL(window.location.href);
    try {
      await dispatch(
        oauth({
          provider: provider,
          code: code.search.split("=")[1].split("&")[0],
        }),
      );
      navigate("/");
    } catch (e) {
      alert("error");
    }
  }, []);

  return (
    <Container>
      <GlobalStyle />
      <Wrapper>{provider}에 로그인 중입니다</Wrapper>
    </Container>
  );
};

export default OAuth;
