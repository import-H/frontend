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

// axios with auth
import axiosInstance from "../utils/axiosInstance";

import { API_URL } from "../config";

import noneProfileImg from "../images/none_profile_image.png";

// style
const MyPageWrapper = styled(Container)`
  & .profileImgArea {
    margin-right: 1.5rem;
    & .EditbuttonArea {
      margin-top: 0.5rem;
    }
  }

  & .nicknameArea {
    margin-bottom: 1rem;
  }

  & .introductionArea {
    color: #aaa;

    & h2 {
      font-weight: 400;
      margin-right: 5px;
    }

    & .editIcon {
      padding: 5px;
      color: #333;
      transition: all 0.3s;
      &:hover {
        color: var(--point-color-orange);
      }
    }
  }

  & #infoArea {
    margin-top: 5%;

    & .element {
      display: flex;

      & .sub {
        font-size: 20px;
        font-weight: bold;
      }

      & .result {
        font-size: 20px;
      }
    }
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.isAuth);
  const nickname = useSelector(state => state.auth.user.user.nickname);
  const profileImg = useSelector(state => state.auth.user.user.profileImage);
  const email = useSelector(state => state.auth.user?.user?.sub);
  const userId = useSelector(state => state.auth.user?.user?.userId);
  const dispatch = useDispatch();

  const [isNicknameChange, setIsNicknameChange] = useState(false);
  const [isIntroduceChange, setIsIntroduceChange] = useState(false);

  const [newNicknameValue, setNewNicknameValue] = useState("");

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  const buttonClick = () => alert("버튼 클릭 임시 함수");

  const onChangeNickname = e => setNewNicknameValue(e.currentTarget.value);

  const changeNickname = () => {
    const data = {
      nickname : newNicknameValue
    }
    axiosInstance.put(`${API_URL}/v1/users/${userId}`, data);
    setIsNicknameChange(false);
  }

  return (
    <MyPageWrapper>
      <GlobalStyle />
      {/* User Info */}
      <div className="flex flex-jc-c">
        <div className="profileImgArea">
          {/* profile image */}
          <div>
            {profileImg === "N" ? (
              <img src={noneProfileImg} width="100" height="100" />
            ) : (
              <img src={profileImg} width="100" height="100" />
            )}
          </div>
          <div className="EditbuttonArea">
            {/* profile image edit button */}
            <Link
              to=""
              className="linkBtn"
              style={{ marginBottom: "3%" }}
              onClick={buttonClick}
            >
              사진 변경
            </Link>
            <Link to="" div className="linkBtn" onClick={buttonClick}>
              사진 삭제
            </Link>
          </div>
        </div>
        {/* 자기소개 */}
        <div>
          <div className="nicknameArea">
            {!isNicknameChange ? (
              <>
                <h1>{nickname}</h1>
                <Link to="" className="editIcon" onClick={() => setIsNicknameChange(true)}>
                  <FontAwesomeIcon icon={faPen} />
                </Link>
              </>
            ) : (
              <form onSubmit={changeNickname}>
                <Input type="text" name="nickname" onChange={onChangeNickname} />
                <button type="submit">확인</button>
              </form>
            )}
          </div>
          <div className="introductionArea flex flex-ai-c">
            <h2>자기소개</h2>{" "}
            <Link to="" className="editIcon" onClick={buttonClick}>
              <FontAwesomeIcon icon={faPen} />
            </Link>
          </div>
        </div>
      </div>
      {/* 추가코드 이 밑으로 입력 */}
      <div id="infoArea">
        <div className="element">
          <span className="sub">이메일</span>
          <span className="result">{email}</span>
        </div>
        <div className="element">
          <span className="sub">이메일 수신 설정</span>
          <input type="checkbox" />
        </div>
        <div className="flex flex-jc-c">
          <Link to="/leave" className="linkBtn">
            회원 탈퇴
          </Link>
        </div>
      </div>
    </MyPageWrapper>
  );
};

export default MyPage;
