import React, { useEffect, useState } from "react";
// styled-components 불러오기
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle.js";
import { DefaultButton, DefaultInput } from "../Styles/theme.js";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../reducers/slices/authSlice";

//r컴포넌트 스타일
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-width: 300px;
  padding: 20px 25px;
  display: flex;
  justify-content: center;
`;
const InputLabel = styled.div`
  font-size: 1.4em;
  margin: 10px 0 5px 0;
  color: #666;
`;

const SubmitButton = styled(DefaultButton)`
  width: 100%;
  margin-top: 25px;
`;

const Register = () => {
  const dispatch = useDispatch();

  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    major: ""
  });

  const [showError, setShowError] = useState("");

  const registerEvent = (e) => {
    e.preventDefault();

    let reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@hongik.ac.kr|@g.hongik.ac.kr|@mail.hongik.ac.kr/;

    if (Object.values(authInfo).includes("") === true) {
      alert("입력하지 않은 정보가 있습니다.");
    } else if (reg.test(authInfo.email) === false) {
      alert("이메일 형식이 잘못 되었습니다.");
    } else if (authInfo.password !== authInfo.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (authInfo.nickname.length > 8) {
      alert("별명의 길이가 너무 깁니다.");
    } else {
      const data = {
        email: authInfo.email,
        password: authInfo.password,
        confirmPassword: authInfo.confirmPassword,
        nickname: authInfo.nickname,
        major: authInfo.major
      };
      dispatch(register(data));
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });

    if (name === "password") {
      if (authInfo.password.length < 8)
        setShowError("비밀번호는 8자 이상이여야 합니다.");
      else if (authInfo.password.length > 15) {
        setShowError("비밀번호는 15자 이하여야 합니다.");
      } else setShowError("");
    }

    if (name === "nickname") {
      if (authInfo.nickname.length > 8) {
        setShowError("별명은 8자 이하여야 합니다.");
      } else setShowError("");
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <form onSubmit={registerEvent}>
        <InputLabel>이메일</InputLabel>
        <DefaultInput type="text" name="email" onChange={onChange} />
        <InputLabel>비밀번호</InputLabel>
        <DefaultInput type="password" name="password" onChange={onChange} />
        <InputLabel>비밀번호 확인</InputLabel>
        <DefaultInput
          type="password"
          name="confirmPassword"
          onChange={onChange}
        />
        <InputLabel>별명</InputLabel>
        <DefaultInput type="text" name="nickname" onChange={onChange} />
        <InputLabel>전공</InputLabel>
        <DefaultInput type="text" name="major" onChange={onChange} />
        <SubmitButton type="submit">회원가입</SubmitButton>
      </form>
      <div>{showError}</div>
    </Container>
  );
};

export default Register;
