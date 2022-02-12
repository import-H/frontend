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

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import noneProfileImg from "../images/none_profile_image.png"

// style
const MyPageWrapper = styled(Container)`
  & .profileImgArea{
    margin-right: 1.5rem;
    & .EditbuttonArea{
      margin-top: 0.5rem;
    }
  }

  & .nicknameArea{
    margin-bottom: 1rem;
  }

  & .introductionArea{
    color: #aaa;

    & h2 {
      font-weight: 400;
      margin-right: 5px;
    }

    & .editIcon{
      padding: 5px;
      color: #333;
      transition: all 0.3s;
      &:hover{
        color: var(--point-color-orange);
      }
    }
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.isAuth);
  const nickname = useSelector(state => state.auth.user.nickname);
  const profileImg = useSelector(state => state.auth.user.profileImage);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!isAuth) {
      navigate("/");
    }
  }, [])

  const buttonClick = () => alert('버튼 클릭 임시 함수');

  return (
      <MyPageWrapper >
          <GlobalStyle />
          {/* User Info */}
          <div className="flex flex-jc-c">
            <div className="profileImgArea">
              {/* profile image */}
              <div>
                {profileImg === "N" ? (
                  <img src={noneProfileImg} width="100" height="100" />
                ): (
                  <img src={profileImg} width="100" height="100" />
                )}
              </div>
              <div className="EditbuttonArea">
                {/* profile image edit button */}
                <Link to="" className="linkBtn" style={{marginBottom: "3%"}} onClick={buttonClick}>사진 변경</Link>
                <Link to="" div className="linkBtn" onClick={buttonClick}>사진 삭제</Link>
              </div>
            </div>
            {/* 자기소개 */}
            <div>
              <div className="nicknameArea"><h1>{nickname}님</h1></div>
              <div className="introductionArea flex flex-ai-c"><h2>자기소개</h2> <Link to="" className="editIcon" ><FontAwesomeIcon icon={faPen} /></Link></div>
              
            </div>
          </div>
          {/* 추가코드 이 밑으로 입력 */}
      </MyPageWrapper>
  )
}

export default MyPage;