// react
import React, { useEffect, useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../redux/slices/authSlice";

// react-router-dom
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/register/RegisterForm";

const RegisterFormContainter = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const navigate = useNavigate();
  const [emailConfirmPage, setEmailConfirmPage] = useState(false);

  // 회원가입 form를 모두 입력했을 때, true로 바뀜
  const [allowSubmit, setAllowSubmit] = useState(false);

  const [authInfo, setAuthInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    pathId: "",
    agree: false,
  });

  const [errorInfo, setErrorInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    pathId: "",
  });

  // 유효성 검사에 사용됨
  const reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  // 회원가입 버튼 클릭했을 때, 발생하는 이벤트
  const onRegister = async e => {
    e.preventDefault();

    const data = {
      email: authInfo.email,
      nickname: authInfo.nickname,
      password: authInfo.password,
      confirmPassword: authInfo.confirmPassword,
      pathId: authInfo.pathId,
      agree: authInfo.agree,
    };
    try {
      await dispatch(signup(data)).unwrap();
      setEmailConfirmPage(true);
      //navigate("/");
    } catch (e) {
      console.log("err", e);
      alert(e.msg);
    }
  };

  // input에 변경이 생겼을 경우, 발생하는 이벤트
  const onChange = e => {
    const { value, name } = e.target;
    if (name === "agree") setAuthInfo({ ...authInfo, [name]: !authInfo.agree });
    else setAuthInfo({ ...authInfo, [name]: value });

    if (name === "password") {
      if (value.length < 8)
        setErrorInfo({
          ...errorInfo,
          [name]: "비밀번호는 8자 이상이여야 합니다.",
        });
      else if (value.length >= 14) {
        setErrorInfo({
          ...errorInfo,
          [name]: "비밀번호는 15자 이하여야 합니다.",
        });
      } else setErrorInfo({ ...errorInfo, [name]: "" });
    }

    if (name === "name") {
      if (value.length < 1) {
        setErrorInfo({ ...errorInfo, [name]: "별명은 2자 이상이여야 합니다." });
      } else if (value.length >= 7) {
        setErrorInfo({ ...errorInfo, [name]: "별명은 8자 이하여야 합니다." });
      } else setErrorInfo({ ...errorInfo, [name]: "" });
    }

    if (name === "email") {
      if (!reg.test(value)) {
        setErrorInfo({
          ...errorInfo,
          [name]: "이메일 형식에 맞게 입력해주세요.",
        });
      } else setErrorInfo({ ...errorInfo, [name]: "" });
    }
    if (name === "confirmPassword") {
      if (authInfo.password !== value) {
        setErrorInfo({ ...errorInfo, [name]: "비밀번호가 일치하지 않습니다." });
      } else setErrorInfo({ ...errorInfo, [name]: "" });
    }

    if (name === "pathId") {
      const regExp = /[^a-zA-Z0-9]+/gi;

      if (value.length < 4 || value.length > 14)
        setErrorInfo({
          ...errorInfo,
          [name]: "id는 5자~15자 사이여야 합니다.",
        });
      else if (regExp.test(value)) {
        setErrorInfo({
          ...errorInfo,
          [name]: "id는 영문과 숫자로만 이루어져야 합니다.",
        });
      } else setErrorInfo({ ...errorInfo, [name]: "" });
    }
  };

  // authInfo와 errorInfo를 감지해 submitState 상태 수정
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }

    if (
      Object.values(errorInfo).every(err => err === "") &&
      !Object.values(authInfo).includes("")
    ) {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }
  }, [authInfo, errorInfo]);
  return (
    <div>
      <RegisterForm
        onChange={onChange}
        onRegister={onRegister}
        allowSubmit={allowSubmit}
        errorInfo={errorInfo}
      />
    </div>
  );
};

export default RegisterFormContainter;
