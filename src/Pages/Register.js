import React, { useEffect, useState } from "react";
// styled-components 불러오기
import styled from "styled-components";
import { DefaultButton, DefaultInput } from "../Styles/theme.js";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [major, setMajor] = useState("");

  const registerEvent = () => {
    //if(이메일 형식 검사)
    //api (연동)
  };

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

  return (
    <Container>
      <form>
        <InputLabel>이메일</InputLabel>
        <DefaultInput type="text" name="email" />
        <InputLabel>비밀번호</InputLabel>
        <DefaultInput type="password" name="password" />
        <InputLabel>비밀번호 확인</InputLabel>
        <DefaultInput type="password" name="confirm_password" />
        <InputLabel>별명</InputLabel>
        <DefaultInput type="text" name="nickname" />
        <InputLabel>전공</InputLabel>
        <DefaultInput type="text" name="major" />
        <SubmitButton backgroundColor="#222" onClick={registerEvent}>
          회원가입
        </SubmitButton>
      </form>
    </Container>
  );
};

export default Register;
