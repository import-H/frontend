// react
import React, { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

// react-router-dom
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../redux/slices/userSlice";
import LoginForm from "../../components/login/LoginForm";

const LoginFormC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
  });

  // 회원가입 버튼 클릭했을 때, 발생하는 이벤트
  const onLogin = async e => {
    e.preventDefault();

    // form 검사
    if (Object.values(authInfo).includes("") === true) {
      alert("입력하지 않은 정보가 있습니다");
    } else {
      const data = {
        email: authInfo.email,
        password: authInfo.password,
      };

      try {
        const user = await dispatch(login(data)).unwrap();
        await dispatch(getProfile(user.sub));
        navigate("/");
      } catch (e) {
        alert(e.msg);
      }
    }
  };

  // input에 변경이 생겼을 경우, 발생하는 이벤트
  const onChange = e => {
    const { value, name } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  useEffect(() => {
    if (auth.isAuth) {
      navigate("/");
    }
  });
  return (
    <div>
      <LoginForm onChange={onChange} onLogin={onLogin} />
    </div>
  );
};

export default LoginFormC;
