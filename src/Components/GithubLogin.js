import { useState, useEffect } from "react";
import axios from "axios";

function GithubLogin() {
  const [data, setData] = useState(null);
  const oAuthURI = `https://github.com/login/oauth/authorize?client_id=56a4d09e65ff131c5571&
response_type=code&
redirect_uri=http://localhost:3000&
`;
  const oAuthHandler = () => {
    // 1. oAuthURL 정보로 URI 변경
    window.location.assign(oAuthURI);
  };

  useEffect(async () => {
    const url = new URL(window.location.href);
    const hash = url.hash;
    console.log("url", url, "hash", hash);
    if (hash) {
      const accessToken = hash.split("=")[1].split("&")[0];
      await axios
        .get("https://github.com/login/oauth/access_token" + accessToken, {
          headers: {
            authorization: `token ${accessToken}`,
            accept: "application/json",
          },
        })
        .then(data => {
          console.log("dd", data);
          setData(data);
        })
        .catch(e => console.log("oAuth token expired"));
    }
  }, []);

  return (
    <div>
      <button id="oAuthBtn" onClick={oAuthHandler}>
        깃허브 로그인
      </button>
    </div>
  );
}

export default GithubLogin;
