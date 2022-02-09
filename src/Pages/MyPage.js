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

  const buttonClick = () => alert('버튼 클릭 임시 함수');

  return (
      <Container>
          <GlobalStyle />
          {/* User Info */}
          <div>
            <div>
              {profileImg === null ? (
                <img src={noneProfileImg} width="100" height="100" />
              ): (
                <img src={profileImg} width="100" height="100" />
              )}
            </div>
            <div style={{marginTop: "5%"}}>
              <Link to="" className="linkBtn" style={{marginBottom: "3%"}} onClick={buttonClick}>사진 변경</Link>
              <Link to="" div className="linkBtn" onClick={buttonClick}>사진 삭제</Link>
            </div>
          </div>
          <div style={{margin: "0 0 0 3%"}}>
            <div><h1>{nickname}님</h1></div>
            <div><h2>자기소개</h2></div>
            <Link to="">수정하기</Link>
          </div>
      </Container>
  )
}

export default MyPage;
