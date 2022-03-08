import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { oauth, oauthAddInfo } from "../../redux/slices/authSlice";
import { getProfile } from "../../redux/slices/userSlice";

// react-router-dom
import { useParams, useNavigate } from "react-router-dom";
import OAuthForm from "../../components/socialAuth/OAuthForm";

const OAuthC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = useParams().provider;
  const auth = useSelector(state => state.auth);

  const [showAddPathId, setShowAddPathId] = useState(false);
  const [pathId, setPathId] = useState("");
  const [pathIdError, setPathIdError] = useState("");

  // pathId 변경
  const onChangePathId = e => {
    setPathId(e.target.value);
    if (pathId.length < 4 || pathId.length > 14) {
      setPathIdError("id는 5자~15자 사이어야 합니다.");
    } else {
      setPathIdError("");
    }
  };

  // pathId 제출
  const onSubmitPathId = async () => {
    try {
      await dispatch(
        oauthAddInfo({ userId: auth.userId, pathId: pathId }),
      ).unwrap();
      await dispatch(getProfile(auth.userId));
      navigate("/");
    } catch (e) {
      alert("pathId 제출 실패");
      navigate(`oauth/${provider}`);
    }
  };

  // 소셜 로그인 OAuth redirect시, 이벤트 발생
  useEffect(async () => {
    const oAuthCode = new URL(window.location.href);
    try {
      const res = await dispatch(
        oauth({
          provider: provider,
          code: oAuthCode.search.split("=")[1].split("&")[0],
        }),
      ).unwrap();

      // 소셜 회원가입
      if (res.isNew) {
        setShowAddPathId(true);
      }
      // 소셜 로그인
      else {
        await dispatch(getProfile(res.userData.sub));
        navigate("/");
      }
    } catch (e) {
      alert(e);
    }
  }, []);
  return (
    <OAuthForm
      showAddPathId={showAddPathId}
      onChangePathId={onChangePathId}
      pathIdError={pathIdError}
      onSubmitPathId={onSubmitPathId}
      provider={provider}
    />
  );
};

export default OAuthC;
