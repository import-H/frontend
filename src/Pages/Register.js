// react
import React, { useEffect, useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../reducers/slices/authSlice";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle";
import { Button, Input, FlexContainer } from "../Styles/theme";

// react-router-dom
import { useNavigate } from "react-router-dom";

const AuthForm = styled.div`
  min-width: 300px;
  max-width: 1200px;

`;

const Label = styled.div`
  font-size: 1.4em;
  margin: 5px 0 5px 0;
  color: #666;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  pointer-events: ${props => (props.submitState ? "auto" : "none")};
  background-color: ${props => (props.submitState ? "black" : "#ddd")};
`;

const AuthInput = styled(Input)`
  &:active,
  &:focus,
  &:focus-visible {
    border-color: ${props => (props.valid.length === 0 ? "green" : "red")};
  }
`;

const ErrorMsg = styled.div`
  display: flex;
  align-itmes: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: red;
  font-size: 1.2rem;
`;

const CheckboxArea = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

const CheckInput = styled.input`
  width: 2rem;
`;

// auth form으로 변경해도 좋을듯(공통 기능 많아서)
const Register = () => {
  const dispatch = useDispatch();
  const registerStatus = useSelector(state => state.auth?.status);
  const navigate = useNavigate();

  // 회원가입 form를 모두 입력했을 때, true로 바뀜
  const [submitState, setSubmitState] = useState(false);

  const [authInfo, setAuthInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errorInfo, setErrorInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  // 유효성 검사에 사용됨
  const reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  // 회원가입 버튼 클릭했을 때, 발생하는 이벤트
  const registerEvent = async e => {
    e.preventDefault();

    const data = {
      email: authInfo.email,
      nickname: authInfo.nickname,
      password: authInfo.password,
      confirmPassword: authInfo.confirmPassword,
      agree: authInfo.agree,
    };
    await dispatch(signup(data));
    if (registerStatus === "success") {
      navigate("/");
    }
  };

  // input에 변경이 생겼을 경우, 발생하는 이벤트
  const onChange = async e => {
    const { value, name } = e.target;
    if (name === "agree") setAuthInfo({ ...authInfo, [name]: !authInfo.agree });
    else await setAuthInfo({ ...authInfo, [name]: value });

    if (name === "password") {
      if (value.length < 8)
        setErrorInfo({
          ...errorInfo,
          [name]: "비밀번호는 8자 이상이여야 합니다.",
        });
      else if (value.length >= 14) {
        setErrorInfo({
          ...errorInfo,
          [name]: "비밀번호는 15자 이하여야 합니다.",
        });
      } else setErrorInfo({ ...errorInfo, [name]: "" });
    }

    if (name === "name") {
      if (value.length < 1) {
        setErrorInfo({ ...errorInfo, [name]: "별명은 2자 이상이여야 합니다." });
      } else if (value.length >= 7) {
        setErrorInfo({ ...errorInfo, [name]: "별명은 8자 이하여야 합니다." });
      } else setErrorInfo({ ...errorInfo, [name]: "" });
    }

    if (name === "email") {
      if (!reg.test(value)) {
        setErrorInfo({
          ...errorInfo,
          [name]: "이메일 형식에 맞게 입력해주세요.",
        });
      } else setErrorInfo({ ...errorInfo, [name]: "" });
    }
    if (name === "confirmPassword") {
      if (authInfo.password !== value) {
        setErrorInfo({ ...errorInfo, [name]: "비밀번호가 일치하지 않습니다." });
      } else setErrorInfo({ ...errorInfo, [name]: "" });
    }
  };

  // authInfo와 errorInfo를 감지해 submitState 상태 수정
  useEffect(() => {
    if (
      Object.values(errorInfo).every(err => err === "") &&
      !Object.values(authInfo).includes("")
    ) {
      setSubmitState(true);
    } else {
      setSubmitState(false);
    }
  }, [authInfo, errorInfo]);

  return (
    <FlexContainer>
      <GlobalStyle />
      <AuthForm>
        <Label>이메일</Label>
        <AuthInput
          type="text"
          name="email"
          onChange={onChange}
          valid={errorInfo.email}
        />
        <ErrorMsg>{errorInfo.email}</ErrorMsg>
        <Label>비밀번호</Label>
        <AuthInput
          type="password"
          name="password"
          onChange={onChange}
          valid={errorInfo.password}
        />
        <ErrorMsg>{errorInfo.password}</ErrorMsg>
        <Label>비밀번호 확인</Label>
        <AuthInput
          type="password"
          name="confirmPassword"
          onChange={onChange}
          valid={errorInfo.confirmPassword}
        />
        <ErrorMsg>{errorInfo.confirmPassword}</ErrorMsg>
        <Label>별명</Label>
        <AuthInput
          type="text"
          name="nickname"
          onChange={onChange}
          valid={errorInfo.nickname}
        />
        <CheckboxArea>
          <CheckInput type="checkbox" name="agree" onChange={onChange} />
          <Label>주 1회 이상 활동하실 계획이 있으시면 체크해주세요.</Label>
        </CheckboxArea>
        <SubmitButton
          type="submit"
          submitState={submitState}
          onClick={registerEvent}
        >
          회원가입
        </SubmitButton>
      </AuthForm>
    </FlexContainer>
  );
};

export default Register;
