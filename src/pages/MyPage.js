import React, { useEffect, useState } from "react";

// react-router-dom
import { Link, useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getProfile, editProfile } from "../redux/slices/userSlice";
import { updateUser } from "../redux/slices/authSlice";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../styles/Globalstyle.js";
import { BigInput, Input, Container } from "../styles/theme.js";

// antd
import "antd/dist/antd.min.css";
import { Modal, Button } from "antd";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faFaceSmile,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

// axios with auth
import axiosInstance from "../utils/axiosInstance";

import { API_URL } from "../config";

import noneProfileImg from "../images/none_profile_image.png";

// style
const MyPageWrapper = styled(Container)`
  & .cardWrap {
    @media (max-width: 768px) {
      flex-direction: column;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }

  & .card {
    width: 50%;
    padding: 25px 30px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.07);
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }

    & h3 {
      font-size: 18px;
      margin-bottom: 25px;
      & svg {
        margin-right: 5px;
      }
    }
    & form {
      flex-grow: 1;
    }

    @media (max-width: 768px) {
      width: 100%;
      margin-bottom: 30px;

      & h3 {
        text-align: center;
      }

      & form input {
        height: 30px;
        border-radius: 3px;
      }
    }
  }

  & .editSubmitBtn {
    margin-left: 10px;
  }

  & .secTit {
    margin-bottom: 50px;
  }

  & .profileImgArea {
    margin-right: 1.5rem;
    & .EditbuttonArea {
      margin-top: 0.5rem;
    }
  }

  & .nicknameArea {
    margin-bottom: 1rem;
    & h1 {
      margin-right: 2px;
    }
  }

  & .introductionArea {
    color: #aaa;

    & h2 {
      font-weight: 400;
      margin-right: 5px;
      margin-bottom: 0;
      color: #aaa;
    }
  }

  & .editIcon {
    padding: 0.5rem;
    color: #333;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      color: var(--point-color-orange);
    }
  }

  & #infoArea {
    flex-grow: 1;
    & .element {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      & .sub {
        font-size: 1.5em;
        font-weight: bold;
        margin-right: 2rem;
      }

      & .editIcon {
        transform: translateX(-1.2rem);
        margin-bottom: 0;
      }

      & .result {
        font-size: 1.5em;
        color: #888;
      }
    }
    & .onoff-switch {
      transform: scale(0.7) translateX(-2rem);
    }

    & .leaveBtnArea {
      margin-top: 5rem;
      @media (max-width: 768px) {
        justify-content: flex-start;
      }
      & .linkBtn {
        margin: 1rem;
        width: 120px;
        background: #aaa;

        &:hover {
          background: var(--point-color-red);
          color: #fff;
        }
      }
    }
  }
`;

const StyledModal = styled(Modal)`
  & .btnArea {
    display: flex;
    justify-content: flex-end;
    margin-top: 3em;

    & .linkBtn {
      font-size: 1.4rem;
      margin-right: 1.5rem;
      width: 50%;
      max-width: 120px;
      &:last-child {
        margin-right: 0;
      }
      &.cancel {
        background-color: #000;
      }
      &.cancel:hover {
        background-color: var(--point-color-orange);
        color: #fff;
      }
    }
  }
`;

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.user.status);
  const isAuth = useSelector(state => state.auth.isAuth);
  const userId = useSelector(state => state.auth.userId);
  const user = useSelector(state => state.user.profile);
  const profileImg = user?.profileImage;

  const [isNicknameChange, setIsNicknameChange] = useState(false);
  const [isIntroduceChange, setIsIntroduceChange] = useState(false);
  const [isPersonalUrlChange, setIsPersonalUrlChange] = useState(false);
  const [isProfileImgUpload, setIsProfileImgUpload] = useState(false);

  const [newNicknameValue, setNewNicknameValue] = useState("");
  const [newIntroduceValue, setNewIntroduceValue] = useState("");
  const [newPersonalUrl, setNewPersonalUrl] = useState("");

  const [userIp, setUserIp] = useState("");

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }

    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(res => setUserIp(res.ip));

    dispatch(getProfile(userId));
  }, [status]);

  const onChangeNickname = e => setNewNicknameValue(e.currentTarget.value);
  const onChangeIntroduce = e => setNewIntroduceValue(e.currentTarget.value);
  const onChangePersonalUrl = e => setNewPersonalUrl(e.currentTarget.value);

  const changeNickname = async e => {
    e.preventDefault();
    const userData = {
      nickname: newNicknameValue,
      introduction: user.introduction,
      personalUrl: user.personalUrl,
      infoByEmail: user.infoByEmail,
      infoByWeb: user.infoByWeb,
      profileImage: profileImg,
    };
    dispatch(editProfile({ userId: userId, userData }));
    dispatch(updateUser());
    setIsNicknameChange(false);
  };

  const changeIntroduce = async e => {
    e.preventDefault();
    if (newIntroduceValue !== "") {
      const userData = {
        nickname: user.nickname,
        introduction: newIntroduceValue,
        personalUrl: user.personalUrl,
        infoByEmail: user.infoByEmail,
        infoByWeb: true,
        profileImage: profileImg,
      };
      dispatch(editProfile({ userId: userId, userData }));
      dispatch(updateUser());
    }
    setIsIntroduceChange(false);
  };
  const introduceDelete = async e => {
    if (window.confirm("자기소개를 삭제할까요?")) {
      e.preventDefault();
      const userData = {
        nickname: user.nickname,
        introduction: null,
        personalUrl: user.personalUrl,
        infoByEmail: user.infoByEmail,
        infoByWeb: user.infoByWeb,
        profileImage: user.profileImage,
      };
      dispatch(editProfile({ userId: userId, userData }));
      dispatch(updateUser());
      alert("삭제가 완료되었습니다.");
    }
  };

  const changePersonalUrl = async e => {
    e.preventDefault();
    const userData = {
      nickname: user.nickname,
      introduction: user.introduction,
      personalUrl: newPersonalUrl,
      infoByEmail: user.infoByEmail,
      infoByWeb: user.infoByWeb,
      profileImage: profileImg,
    };
    dispatch(editProfile({ userId: userId, userData }));
    dispatch(updateUser());
    setIsPersonalUrlChange(false);
  };
  const personalUrlDelete = async e => {
    if (window.confirm("홈페이지 주소를 삭제할까요?")) {
      e.preventDefault();
      const userData = {
        nickname: user.nickname,
        introduction: user.introduction,
        personalUrl: null,
        infoByEmail: user.infoByEmail,
        infoByWeb: user.infoByWeb,
        profileImage: user.profileImage,
      };
      dispatch(editProfile({ userId: userId, userData }));
      dispatch(updateUser());
      alert("삭제가 완료되었습니다.");
    }
  };

  const profileImgDelete = async e => {
    if (window.confirm("프로필 사진을 삭제할까요?")) {
      e.preventDefault();
      const userData = {
        nickname: user.nickname,
        introduction: user.introduction,
        personalUrl: user.personalUrl,
        infoByEmail: user.infoByEmail,
        infoByWeb: user.infoByWeb,
        profileImage: "N",
      };
      dispatch(editProfile({ userId: userId, userData }));
      dispatch(updateUser());
      alert("삭제가 완료되었습니다.");
    }
  };

  return (
    <MyPageWrapper>
      <GlobalStyle />
      {/* User Info */}
      {user && (
        <>
          <h1 className="secTit">{user.nickname} 님 마이페이지 &#128516;</h1>
          <div className="cardWrap flex flex-jc-c">
            <div className="card">
              <h3>
                <FontAwesomeIcon icon={faFaceSmile} /> 나의 프로필
              </h3>
              <div className="flex" style={{ paddingTop: "15px" }}>
                <div className="profileImgArea">
                  {/* profile image */}
                  <div>
                    <StyledModal
                      className="profileModal"
                      visible={isProfileImgUpload}
                      title="프로필 사진 업로드"
                      width={600}
                      onCancel={() => setIsProfileImgUpload(false)}
                      footer={null}
                    >
                      {/* https://enai.tistory.com/37 참고 */}
                      <input
                        type="file"
                        name="profileImg"
                        id="imgFileOpenInput"
                        accept="image/*"
                      ></input>
                      <div className="btnArea">
                        <div
                          className="linkBtn cancel element"
                          onClick={() => setIsProfileImgUpload(false)}
                        >
                          취소
                        </div>
                        <div
                          className="linkBtn submit element"
                          onClick={() => {
                            alert("업로드가 완료되었습니다.");
                            setIsProfileImgUpload(false);
                          }}
                        >
                          확인
                        </div>
                      </div>
                    </StyledModal>
                    {profileImg ? (
                      <img src={profileImg} width="100" height="100" />
                    ) : (
                      <img src={noneProfileImg} width="100" height="100" />
                    )}
                  </div>
                  <div className="EditbuttonArea">
                    {/* profile image edit button */}
                    <div
                      className="linkBtn"
                      style={{ marginBottom: "3%" }}
                      onClick={() => setIsProfileImgUpload(true)}
                    >
                      {profileImg === "N" ? "사진 등록" : "사진 변경"}
                    </div>
                    {profileImg !== "N" && (
                      <Link
                        to=""
                        className="linkBtn"
                        onClick={profileImgDelete}
                      >
                        사진 삭제
                      </Link>
                    )}
                  </div>
                </div>
                {/* 자기소개 */}
                <div style={{ flexGrow: 1 }}>
                  <div className="nicknameArea flex flex-ai-c">
                    {!isNicknameChange ? (
                      <>
                        <h1>{user.nickname}</h1>{" "}
                        <div
                          className="editIcon"
                          onClick={() => setIsNicknameChange(true)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                      </>
                    ) : (
                      <form className="flex" onSubmit={changeNickname}>
                        <Input
                          type="text"
                          name="nickname"
                          onChange={onChangeNickname}
                        />
                        <button className="linkBtn editSubmitBtn" type="submit">
                          확인
                        </button>
                      </form>
                    )}
                  </div>
                  <div className="introductionArea flex flex-ai-c">
                    {!isIntroduceChange ? (
                      <>
                        <h2>
                          {user.introduction === "" ||
                          user.introduction === null
                            ? "자기소개가 없습니다."
                            : user.introduction}
                        </h2>{" "}
                        <div
                          className="editIcon"
                          onClick={() => setIsIntroduceChange(true)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                        {user.introduction && (
                          <div className="editIcon" onClick={introduceDelete}>
                            <FontAwesomeIcon icon={faTrash} />
                          </div>
                        )}
                      </>
                    ) : (
                      <form className="flex" onSubmit={changeIntroduce}>
                        <Input
                          type="text"
                          name="nickname"
                          onChange={onChangeIntroduce}
                        />
                        <button className="linkBtn editSubmitBtn" type="submit">
                          확인
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
              {/* 여기까지 */}
            </div>
            {/* 추가코드 이 밑으로 입력 */}
            <div className="card" id="infoArea">
              <h3>
                <FontAwesomeIcon icon={faGear} /> 설정
              </h3>
              <div className="element">
                <span className="sub">접속 중인 IP</span>
                <span className="result">{userIp}</span>
              </div>
              <div className="element">
                <span className="sub">이메일</span>
                <span className="result">{user.email}</span>
              </div>
              <div className="element">
                <span className="sub">이메일 수신 설정</span>
                <label className="switch-button">
                  <input type="checkbox" />
                  <span className="onoff-switch" />
                </label>
              </div>
              <div className="element">
                <span className="sub">홈페이지</span>
                {!isPersonalUrlChange ? (
                  <>
                    <span className="result">
                      <a href={user.personalUrl} target="_blank">
                        {user.personalUrl ? user.personalUrl : ""}
                      </a>
                    </span>
                    <div
                      className="editIcon"
                      onClick={() => setIsPersonalUrlChange(true)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </div>
                    {user.personalUrl && (
                      <div className="editIcon" onClick={personalUrlDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    )}
                  </>
                ) : (
                  <form className="flex" onSubmit={changePersonalUrl}>
                    <BigInput
                      type="text"
                      name="personalUrl"
                      onChange={onChangePersonalUrl}
                      placeholder="http 혹은 https를 포함해서 입력해야 정상 동작합니다."
                    />
                    <button className="linkBtn editSubmitBtn" type="submit">
                      확인
                    </button>
                  </form>
                )}
              </div>
              <div className="leaveBtnArea flex flex-jc-e">
                {user.oauthId ? (
                  <>
                    <Link to="/leave/auth" className="linkBtn">
                      회원 탈퇴
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/changepw" className="linkBtn">
                      비밀번호 변경
                    </Link>
                    <Link to="/leave/oauth" className="linkBtn">
                      회원 탈퇴
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </MyPageWrapper>
  );
};

export default MyPage;
