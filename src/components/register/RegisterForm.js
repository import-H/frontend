import React from "react";
import styled from "styled-components";
import { Button, Input } from "../../Styles/theme";
import SocialAuth from "../SocialAuth";

const AuthForm = styled.div`
  min-width: 300px;
  max-width: 1200px;
  @media (max-width: 500px) {
    min-width: unset;
    max-width: 300px;
  }
  & .email-area {
    display: flex;
    flex-direction: row;

    & input {
      flex: 5;
    }
    & .email-btn {
      cursor: pointer;
      font-size: 1.3rem;
      text-decoration: underline;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }
  }
`;

const Label = styled.div`
  font-size: 1.4em;
  margin: 5px 0 5px 0;
  color: #666;
  &.checkLabel {
    font-size: 1.3em;
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  font-size: 1.4em;
  pointer-events: ${props => (props.allowSubmit ? "auto" : "none")};
  background-color: ${props => (props.allowSubmit ? "black" : "#ddd")};
  @media (max-width: 768px) {
    font-size: 1.3em;
  }
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
  align-items: center;
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

const EmailConfirm = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const Wrapper = styled.div`
  min-width: 300px;
  @media (max-width: 500px) {
    min-width: unset;
    max-width: 300px;
    width: 90%;
  }
`;

const RegisterForm = props => {
  const { onChange, onRegister, allowSubmit, errorInfo } = props;
  return (
    <Wrapper>
      <div>
        <SocialAuth />
        <AuthForm>
          <Label>이메일</Label>
          <div className="email-area">
            <AuthInput
              type="text"
              name="email"
              onChange={onChange}
              valid={errorInfo.email}
            />
          </div>
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
          <ErrorMsg></ErrorMsg>
          <Label>개인페이지 id</Label>
          <AuthInput
            type="text"
            name="pathId"
            onChange={onChange}
            valid={errorInfo.pathId}
            placeholder="개인 페이지에 사용될 id를 입력해주세요(영문)"
          />
          <ErrorMsg>{errorInfo.pathId}</ErrorMsg>
          <CheckboxArea>
            <CheckInput type="checkbox" name="agree" onChange={onChange} />
            <Label className="checkLabel">
              주 1회 이상 활동하실 계획이 있으시면 체크해주세요.
            </Label>
          </CheckboxArea>
          <SubmitButton
            type="submit"
            allowSubmit={allowSubmit}
            onClick={onRegister}
          >
            회원가입
          </SubmitButton>
        </AuthForm>
      </div>
      // <EmailConfirm>가입하신 이메일에서 인증 진행바랍니다.</EmailConfirm>
    </Wrapper>
  );
};

export default RegisterForm;
