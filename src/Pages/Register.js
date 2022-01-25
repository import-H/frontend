// react
import React, { useEffect, useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { register } from "../reducers/slices/authSlice";

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
`;

const InputEmail = styled(Input)`
  &:active,
  &:focus,
  &:focus-visible {
    border-color: ${(props) => (props.valid ? "green" : "red")};
  }
`;

const InputPW = styled(Input)`
  &:active,
  &:focus,
  &:focus-visible {
    border-color: ${(props) =>
      props.valid > 8 && props.valid < 15 ? "green" : "red"};
  }
`;

const InputConfirmPW = styled(Input)`
  &:active,
  &:focus,
  &:focus-visible {
    border-color: ${(props) => (props.valid ? "green" : "red")};
  }
`;

const InputName = styled(Input)`
  &:active,
  &:focus,
  &:focus-visible {
    border-color: ${(props) =>
      props.valid > 1 && props.valid < 8 ? "green" : "red"};
  }
  console.log(e.target.value)
`;

const ErrorMsg = styled.div`
  display: flex;
  align-itmes: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: red;
  font-size: 1.2rem;
`;

// auth form으로 변경해도 좋을듯(공통 기능 많아서)
const Register = () => {
  const [submitState, setSubmitState] = useState(false);
  const dispatch = useDispatch();

  const [showError, setShowError] = useState("");

  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    major: ""
  });

  const reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  // 회원가입 버튼 클릭했을 때, 발생하는 이벤트
  const registerEvent = (e) => {
    e.preventDefault();

    const data = {
      email: authInfo.email,
      password: authInfo.password,
      confirmPassword: authInfo.confirmPassword,
      name: authInfo.name,
      major: authInfo.major
    };
    dispatch(register(data));
  };

  // input에 변경이 생겼을 경우, 발생하는 이벤트
  const onChange = (e) => {
    const { value, name } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });

    if (name === "password") {
      if (authInfo.password.length < 8)
        setShowError("비밀번호는 8자 이상이여야 합니다.");
      else if (authInfo.password.length >= 14) {
        setShowError("비밀번호는 15자 이하여야 합니다.");
      } else setShowError("");
    }

    if (name === "name") {
      if (authInfo.name.length < 1) {
        setShowError("별명은 2자 이상이여야 합니다.");
      } else if (authInfo.name.length >= 7) {
        setShowError("별명은 8자 이하여야 합니다.");
      } else setShowError("");
    }

    if (name === "email") {
      if (!reg.test(authInfo.email)) {
        setShowError("이메일 형식에 맞게 입력해주세요.");
      } else setShowError("");
    }
    if (name === "confirmPassword") {
      if (authInfo.password !== authInfo.confirmPassword) {
        setShowError("비밀번호가 일치하지 않습니다.");
      } else setShowError("");
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <form onSubmit={registerEvent}>
        <Label>이메일(홍익대학교)</Label>
        <InputEmail
          type="text"
          name="email"
          onChange={onChange}
          valid={reg.test(authInfo.email)}
        />
        <Label>비밀번호</Label>
        <InputPW
          type="password"
          name="password"
          onChange={onChange}
          valid={authInfo.password.length}
        />
        <Label>비밀번호 확인</Label>
        <InputConfirmPW
          type="password"
          name="confirmPassword"
          onChange={onChange}
          valid={authInfo.password === authInfo.confirmPassword}
        />
        <Label>별명</Label>
        <InputName
          type="text"
          name="name"
          onChange={onChange}
          valid={authInfo.name.length}
        />
        <Label>전공</Label>
        <Input type="text" name="major" onChange={onChange} />
        <ErrorMsg>{showError}</ErrorMsg>
        <SubmitButton type="submit" submitState={submitState}>
          회원가입
        </SubmitButton>
      </form>
    </Container>
  );
};

export default Register;
