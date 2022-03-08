import React from "react";

// components
import SocialAuthBtn from "../../components/socialAuth/SocialAuthBtn";

// config
import { OAuth } from "../../config";

const SocialAuthBtnC = ({ socialType }) => {
  const oAuthURI = `${OAuth[socialType].url}?client_id=${OAuth[socialType].client_id}&response_type=${OAuth[socialType].response_type}&scope=${OAuth[socialType].scope}&redirect_uri=${OAuth[socialType].redirect_uri}`;

  const oAuthHandler = () => {
    window.location.assign(oAuthURI);
  };
  return (
    <SocialAuthBtn
      oAuthHandler={oAuthHandler}
      oAuthURI={oAuthURI}
      socialType={socialType}
    />
  );
};

export default SocialAuthBtnC;
