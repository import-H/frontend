import React, { useEffect, useState } from "react";

// react-router-dom
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle.js";
import { Button, Input, Container } from "../Styles/theme.js";

import noneProfileImg from "../images/none_profile_image.png"

const MyPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.isAuth);
  const nickname = useSelector(state => state.auth.authTokens.nickname);
  const profileImg = useSelector(state => state.auth.authTokens.profileImage);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!isAuth) {
      navigate("/");
    }
  }, [])

  return (
      <Container>
          <GlobalStyle />
          {profileImg === null ? (
            <div><img src={noneProfileImg} width="100" height="100" /></div>
          ): (
            <div><img src={profileImg} width="100" height="100" /></div>
          )}
          <div><h1>{nickname}님의 마이페이지</h1></div>
      </Container>
  )
}

export default MyPage;
