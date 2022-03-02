import React from "react";
import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";
import styled from "styled-components";

const SocialAuthWrap = styled.div`
  & > div{
    margin-bottom: 1.5rem;
  }
`;

const SocialAuth = () => {
  return (
    <SocialAuthWrap>
      <GoogleLogin />
      <GithubLogin />
    </SocialAuthWrap>
  );
};

export default SocialAuth;
