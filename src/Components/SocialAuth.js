import React from "react";
import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";

const SocialAuth = () => {
  return (
    <div>
      <GoogleLogin />
      <GithubLogin />
    </div>
  );
};

export default SocialAuth;
