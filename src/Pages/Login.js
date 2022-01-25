// react
import React, { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../reducers/slices/authSlice";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle";
import { Button, Input, Container } from "../Styles/theme";

const Label = styled.div`
  font-size: 1.4em;
  margin: 10px 0 5px 0;
  color: #666;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 25px;
`;

// auth form으로 변경해도 좋을듯(공통 기능 많아서)
const Login = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const [showError, setShowError] = useState("");

  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: ""
  });

  // 회원가입 버튼 클릭했을 때, 발생하는 이벤트
  const loginEvent = async (e) => {
    e.preventDefault();

    // form 검사
    if (Object.values(authInfo).includes("") === true) {
      alert("입력하지 않은 정보가 있습니다");
    } else {
      const data = {
        email: authInfo.email,
        password: authInfo.password
      };
      await dispatch(login(data));
    }
  };

  // input에 변경이 생겼을 경우, 발생하는 이벤트
  const onChange = (e) => {
    const { value, name } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  // isAuth가 true 인 경우(로그인 완료), 랜딩페이지로 이동
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <Container>
      <GlobalStyle />
      <form onSubmit={loginEvent}>
        <Label>이메일(홍익대학교)</Label>
        <Input type="text" name="email" onChange={onChange} />
        <Label>비밀번호</Label>
        <Input type="password" name="password" onChange={onChange} />

        <SubmitButton type="submit">로그인</SubmitButton>
      </form>
      <div>{showError}</div>
    </Container>
  );
};

export default Login;
