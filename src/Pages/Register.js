// react
import React, { useEffect, useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { register } from "../reducers/slices/authSlice";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle.js";
import { Button, Input } from "../Styles/theme.js";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-width: 300px;
  padding: 20px 25px;
  display: flex;
  justify-content: center;
`;
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
const Register = () => {
  const dispatch = useDispatch();

  const [showError, setShowError] = useState("");

  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    major: ""
  });

  // 회원가입 버튼 클릭했을 때, 발생하는 이벤트
  const registerEvent = (e) => {
    e.preventDefault();

    // 이메일 검사(RegExp)
    let reg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])@hongik.ac.kr|@g.hongik.ac.kr|@mail.hongik.ac.kr/;

    // form 검사
    // if else 말고 조금 더 효율적인 방법 있을지 고민 필요
    if (Object.values(authInfo).includes("") === true) {
      alert("입력하지 않은 정보가 있습니다.");
    } else if (reg.test(authInfo.email) === false) {
      alert("홍익대학교 이메일로 입력해주세요.");
    } else if (authInfo.password !== authInfo.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (authInfo.name.length > 8) {
      alert("별명의 길이가 너무 깁니다.");
    } else {
      const data = {
        email: authInfo.email,
        password: authInfo.password,
        confirmPassword: authInfo.confirmPassword,
        name: authInfo.name,
        major: authInfo.major
      };
      dispatch(register(data));
    }
  };

  // input에 변경이 생겼을 경우, 발생하는 이벤트
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

    if (name === "name") {
      if (authInfo.name.length > 8) {
        setShowError("별명은 8자 이하여야 합니다.");
      } else setShowError("");
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <form onSubmit={registerEvent}>
        <Label>이메일(홍익대학교)</Label>
        <Input type="text" name="email" onChange={onChange} />
        <Label>비밀번호</Label>
        <Input type="password" name="password" onChange={onChange} />
        <Label>비밀번호 확인</Label>
        <Input type="password" name="confirmPassword" onChange={onChange} />
        <Label>별명</Label>
        <Input type="text" name="name" onChange={onChange} />
        <Label>전공</Label>
        <Input type="text" name="major" onChange={onChange} />
        <SubmitButton type="submit">회원가입</SubmitButton>
      </form>
      <div>{showError}</div>
    </Container>
  );
};

export default Register;
