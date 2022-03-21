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
import useMyPage from "../hooks/useMypage";
import Scrap from "../components/mypage/Scrap";

// style
const ImgInput = styled.input`
  position: relative;
  bottom: -0.5rem;
  left: 0rem;
`;

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

const changeData = (user, cur, val) => {
  const userData = {
    nickname: user.nickname,
    introduction: user.introduction,
    personalUrl: user.personalUrl,
    profileImage: user.profileImage,
    receiveAgree: { email: user.infoByEmail, web: user.infoByWeb },
  };
  if (cur === "email" || cur === "web")
    return {
      ...userData,
      receiveAgree: {
        email: user.infoByEmail,
        web: user.infoByWeb,
        [cur]: val,
      },
    };
  return { ...userData, [cur]: val };
};

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.isAuth);
  const userId = useSelector(state => state.auth.userId);
  const user = useSelector(state => state.user.profile);
  const profileImg = user?.profileImage;

  const [isChange, setIsChange] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState();
  console.log(data);

  const onChange = e => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const [userIp, setUserIp] = useState("");

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }

    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(res => setUserIp(res.ip));

    dispatch(getProfile(userId));
  }, []);

  useEffect(() => {
    setData({
      infoByEmail: user?.infoByEmail || "",
      infoByWeb: user?.infoByWeb || "",
      introduction: user?.introduction || "",
      nickname: user?.nickname || "",
      personalUrl: user?.personalUrl || "",
      profileImage: user?.profileImage || "",
    });
  }, [user]);

  const onSubmit = () => {
    if (isChange) {
      dispatch(editProfile({ userId: userId, userData: data }));
      dispatch(updateUser());
      setIsChange(false);
    } else {
      setIsChange(true);
    }
  };

  const onImageChage = async e => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("image", img);

    const response = await axiosInstance.post(
      `${API_URL}/v1/file/upload`,
      formData,
      { header: { "content-type": "multipart/formdata" } },
    );

    const url = `${API_URL}${response.data.data.imageURL}`;
    setData({ ...data, profileImage: url });
  };

  return (
    <MyPageWrapper>
      <GlobalStyle />
      {user?.nickname && (
        <>
          <h1 className="secTit">{user.nickname} 님 마이페이지 &#128516;</h1>
          <div className="cardWrap flex flex-jc-c">
            <div className="card">
              <h3>
                <FontAwesomeIcon icon={faFaceSmile} /> 나의 프로필
              </h3>
              <div className="flex" style={{ paddingTop: "15px" }}>
                <div className="profileImgArea">
                  {profileImg ? (
                    <img src={profileImg} width="100" height="100" />
                  ) : (
                    <img src={noneProfileImg} width="100" height="100" />
                  )}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div className="nicknameArea flex flex-ai-c">
                    <h1>{user.nickname}</h1>
                  </div>
                  <div className="introductionArea flex flex-ai-c">
                    <h2>
                      {user.introduction === "" || user.introduction === null
                        ? "자기소개가 없습니다."
                        : user.introduction}
                    </h2>
                  </div>
                </div>
                <div className="element">
                  <span className="sub">접속 중인 IP</span>
                  <span className="result">{userIp}</span>
                </div>
                <div className="element">
                  <span className="sub">이메일</span>
                  <span className="result">{user.email}</span>
                </div>
              </div>
              {/* 여기까지 */}
            </div>

            <div className="card" id="infoArea">
              <h3>
                <FontAwesomeIcon icon={faGear} /> 설정
              </h3>

              <div>
                <label>
                  이름
                  {isChange ? (
                    <Input
                      value={data.nickname}
                      name="nickname"
                      onChange={onChange}
                    />
                  ) : (
                    user.nickname
                  )}
                </label>
              </div>
              <div>
                <label>
                  자기소개
                  {isChange ? (
                    <Input
                      value={data.introduction}
                      name="introduction"
                      onChange={onChange}
                    />
                  ) : (
                    user.introduction
                  )}
                </label>
              </div>
              <div>
                <label>
                  웹사이트
                  {isChange ? (
                    <Input
                      value={data.personalUrl}
                      name="personalUrl"
                      onChange={onChange}
                    />
                  ) : (
                    user.personalUrl
                  )}
                </label>
              </div>
              <div>프로필 이미지</div>
              {isChange && (
                <div>
                  <img src={data.profileImage} alt="프로필 이미지" />
                  {showModal && (
                    <ImgInput
                      type="file"
                      accept="image/jpg,image/png,image/jpeg,image/gif"
                      name="imgUrl"
                      onChange={onImageChage}
                    />
                  )}
                  <button
                    className="linkBtn"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    변경
                  </button>
                  <button
                    className="linkBtn"
                    onClick={() => {
                      setData({ ...data, profileImage: "" });
                    }}
                  >
                    삭제
                  </button>
                </div>
              )}

              <div className="linkBtn" onClick={onSubmit}>
                설정 변경
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
          <div className="cardWrap flex flex-jc-c">
            <Scrap userId={userId} />
          </div>
        </>
      )}
    </MyPageWrapper>
  );
};

export default MyPage;
