import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { oauth, oauthAddInfo } from "../reducers/slices/authSlice";

// react-router-dom
import { useParams, useNavigate } from "react-router-dom";

// style
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle";
import { Button, Input, Container } from "../Styles/theme";

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
  pointer-events: ${props => (props.submitState ? "auto" : "none")};
  background-color: ${props => (props.submitState ? "black" : "#ddd")};
`;

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = useParams().provider;
  const auth = useSelector(state => state.auth);

  const [showAddPathId, setShowAddPathId] = useState(false);
  const [pathId, setPathId] = useState("");
  const [pathIdError, setPathIdError] = useState("");

  const onChange = e => {
    setPathId(e.target.value);
    if (pathId.length < 4 || pathId.length > 14) {
      setPathIdError("id는 5자~15자 사이어야 합니다.");
    } else {
      setPathIdError("");
    }
  };

  const onSubmit = async () => {
    try {
      const data = {
        userId: auth.userId,
        pathId: pathId,
      };
      await dispatch(oauthAddInfo(data));
      navigate("/");
    } catch (e) {
      alert("pathId 제출 실패");
    }
  };

  useEffect(async () => {
    const code = new URL(window.location.href);
    try {
      const res = await dispatch(
        oauth({
          provider: provider,
          code: code.search.split("=")[1].split("&")[0],
        }),
      ).unwrap();

      console.log(res);
      if (res.isNew.isNew) {
        setShowAddPathId(true);
      } else {
        navigate("/");
      }
    } catch (e) {
      alert("error1");
    }
  }, []);

  return (
    <Container>
      <GlobalStyle />
      <Wrapper>
        {showAddPathId ? (
          <div>
            <AuthInput
              type="text"
              name="pathId"
              onChange={onChange}
              valid={pathIdError}
            />
            <ErrorMsg>{pathIdError}</ErrorMsg>
            <SubmitButton
              type="submit"
              submitState={pathIdError.length}
              onClick={onSubmit}
            >
              회원가입
            </SubmitButton>
          </div>
        ) : (
          <div>{provider}에 로그인 중입니다..</div>
        )}
      </Wrapper>
    </Container>
  );
};

export default OAuth;
