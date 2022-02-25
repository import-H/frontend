import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";

function GoogleLogin() {
  const [data, setData] = useState(null);
  const oAuthURI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=859188632438-sn7kqf60l9h5b005tlq1ka0u9oj103c7.apps.googleusercontent.com&
response_type=token&
redirect_uri=http://localhost:3000&
scope=https://www.googleapis.com/auth/userinfo.email`;
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
        .get(
          "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" +
            accessToken,
          {
            headers: {
              authorization: `token ${accessToken}`,
              accept: "application/json",
            },
          },
        )
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
        버튼
        <div id="comment">구글 OAuth</div>
      </button>
    </div>
  );
}

export default GoogleLogin;
