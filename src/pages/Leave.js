// react
import React, { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { logout } from "../redux/slices/authSlice";
// styled-components
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle.js";
import { Button, Input, FlexContainer } from "../Styles/theme.js";

// react-router-dom
import { useNavigate, useParams } from "react-router-dom";

// axios with auth
import axiosInstance from "../utils/axiosInstance";

import { API_URL } from "../config";
import SocialAuth from "../components/socialAuth/SocialAuth";

// style
const Label = styled.div`
  font-size: 1.4em;
  margin: 10px 0 5px 0;
  color: #666;
`;
const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 25px;
`;

const Leave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authType = useParams().authType;

  const isAuth = useSelector(state => state.auth.isAuth);
  const email = useSelector(state => state.user?.profile?.email);
  const userId = useSelector(state => state.auth.userId);

  const [showError, setShowError] = useState("");

  const [authInfo, setAuthInfo] = useState({
    password: "",
  });

  // 회원탈퇴 버튼 클릭했을 때, 발생하는 이벤트
  const leaveEvent = async e => {
    e.preventDefault();

    // form 검사
    if (Object.values(authInfo).includes("") === true) {
      alert("비밀번호를 입력해주세요.");
    } else {
      const data = {
        email: email,
        password: authInfo.password,
      };
      if (
        window.confirm(
          "정말로 탈퇴할까요? 데이터는 다시 복구되지 않습니다. 신중히 선택해주세요.",
        )
      ) {
        try {
          const ers = await dispatch(login(data)).unwrap();
          console.log("rs", ers);
          await axiosInstance.delete(`${API_URL}/v1/users/${userId}`);
          alert("탈퇴가 완료되었습니다.");
          dispatch(logout());
          navigate("/");
        } catch (e) {
          alert("틀린 비밀번호를 입력했습니다. 비밀번호를 확인해주세요.");
        }
      } else {
        alert("취소합니다.");
        navigate("/mypage"); // 취소하고 마이페이지로 복귀
      }
    }
  };

  // input에 변경이 생겼을 경우, 발생하는 이벤트
  const onChange = e => {
    const { value, name } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  });

  return (
    <FlexContainer>
      <GlobalStyle />
      {!authType === "auth" ? (
        <form onSubmit={leaveEvent}>
          <Label>비밀번호</Label>
          <Input type="password" name="password" onChange={onChange} />

          <SubmitButton type="submit">회원탈퇴</SubmitButton>
        </form>
      ) : (
        <div>
          <h2>회원 탈퇴를 위해 등록했던 소셜 계정으로 인증해주세요</h2>
          <SocialAuth />
        </div>
      )}
    </FlexContainer>
  );
};

export default Leave;
