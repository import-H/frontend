import React from "react";

import styled from "styled-components";
import { OAuth } from "../../config";
import SocialAuthBtnC from "../../containters/socialAuth/SocialAuthBtnC";

const SocialAuthWrap = styled.div`
  & > div {
    margin-bottom: 1.5rem;
  }
`;

const SocialAuth = () => {
  return (
    <SocialAuthWrap>
      {Object.keys(OAuth).map(socialType => (
        <SocialAuthBtnC key={socialType} socialType={socialType} />
      ))}
    </SocialAuthWrap>
  );
};

export default SocialAuth;
