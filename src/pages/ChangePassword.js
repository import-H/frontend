// react
import React, { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { logout } from "../redux/slices/authSlice";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../styles/Globalstyle.js";
import { Button, Input, FlexContainer } from "../styles/theme.js";

// react-router-dom
import { useNavigate } from "react-router-dom";

// axios with auth
import axiosInstance from "../utils/axiosInstance";

import { API_URL } from "../config";

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

const ChangePassword = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.isAuth);
  const email = useSelector(state => state.user?.profile?.email);
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  const [showError, setShowError] = useState("");

  const [authInfo, setAuthInfo] = useState({
    password: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  // 비밀번호 변경 버튼 클릭했을 때, 발생하는 이벤트
  const ChangePasswordEvent = async e => {
    e.preventDefault();

    if (authInfo.newPassword === authInfo.newConfirmPassword) {
      if (
        authInfo.newPassword.length >= 8 &&
        authInfo.newPassword.length <= 50
      ) {
        // form 검사
        if (Object.values(authInfo).includes("") === true) {
          alert("입력하지 않은 정보가 있습니다.");
        } else {
          const data = {
            email: email,
            password: authInfo.password,
          };
          const newPasswordData = {
            password: authInfo.newPassword,
            confirmPassword: authInfo.newConfirmPassword,
          };
          try {
            const ers = await dispatch(login(data)).unwrap();
            console.log("rs", ers);
            await axiosInstance.put(
              `${API_URL}/v1/users/${userId}/updatePassword`,
              { ...newPasswordData },
            );
            alert("비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.");
            dispatch(logout());
            navigate("/");
          } catch (e) {
            alert("틀린 비밀번호를 입력했습니다. 비밀번호를 확인해주세요.");
          }
        }
      } else {
        alert("비밀번호는 8자 이상 50자 이내 형식으로 가능합니다.");
      }
    } else {
      alert("변경할 비밀번호와 변경할 비밀번호 확인이 같은지 확인해주세요.");
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
      <form onSubmit={ChangePasswordEvent}>
        <Label>비밀번호</Label>
        <Input type="password" name="password" onChange={onChange} />
        <Label>변경할 비밀번호</Label>
        <Input type="password" name="newPassword" onChange={onChange} />
        <Label>변경할 비밀번호 확인</Label>
        <Input type="password" name="newConfirmPassword" onChange={onChange} />
        <SubmitButton type="submit">비밀번호 변경</SubmitButton>
      </form>
    </FlexContainer>
  );
};

export default ChangePassword;
