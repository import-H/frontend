// react
import React from "react";

// styled-components
import styled from "styled-components";
import { Button, Input } from "../../styles/theme.js";
import SocialAuth from "../socialAuth/SocialAuth.js";

// style
const Label = styled.div`
  font-size: 1.4em;
  margin: 10px 0 5px 0;
  color: #666;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 25px;
  font-size: 1.4em;
  @media (max-width: 768px) {
    font-size: 1.3em;
  }
`;

const Wrapper = styled.div`
  min-width: 300px;
  @media (max-width: 500px) {
    min-width: unset;
    max-width: 300px;
    width: 90%;
  }
`;
const LoginForm = props => {
  const { onChange, onLogin } = props;
  return (
    <Wrapper>
      <SocialAuth />
      <form onSubmit={onLogin}>
        <Label>이메일</Label>
        <Input type="text" name="email" onChange={onChange} />
        <Label>비밀번호</Label>
        <Input type="password" name="password" onChange={onChange} />

        <SubmitButton type="submit">로그인</SubmitButton>
      </form>
    </Wrapper>
  );
};

export default LoginForm;
