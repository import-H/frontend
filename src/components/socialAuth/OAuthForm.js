import React from "react";

// style
import styled from "styled-components";
import { Button, Input } from "../../styles/theme";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  pointer-events: ${props => (!props.submitState ? "auto" : "none")};
  background-color: ${props => (!props.submitState ? "black" : "#ddd")};
`;

const OAuthForm = ({
  showAddPathId,
  onChangePathId,
  pathIdError,
  onSubmitPathId,
  provider,
}) => {
  return (
    <Wrapper>
      {showAddPathId ? (
        <div>
          <AuthInput
            type="text"
            name="pathId"
            onChange={onChangePathId}
            valid={pathIdError}
          />
          <ErrorMsg>{pathIdError}</ErrorMsg>
          <SubmitButton
            type="submit"
            submitState={pathIdError.length}
            onClick={onSubmitPathId}
          >
            회원가입
          </SubmitButton>
        </div>
      ) : (
        <div>{provider}에 로그인 중입니다..</div>
      )}
    </Wrapper>
  );
};

export default OAuthForm;
