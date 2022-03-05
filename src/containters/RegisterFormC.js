// react
import React, { useEffect, useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../redux/slices/authSlice";

// react-router-dom
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/register/RegisterForm";

// 회원가입 input rule
const inputRule = {
  email: {
    text: "이메일",
    regexp:
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  },
  password: { text: "비밀번호", min: 8, max: 15 },
  name: { text: "별명", min: 2, max: 8 },
  pathId: { text: "개인 페이지", regexp: /[a-zA-Z0-9]+/g, min: 5, max: 15 },
};

// input 유효성 검사
const testInput = (value, name, errorInfo) => {
  const inputType = inputRule[name];
  let result = "";

  if (inputType?.regexp) {
    if (!inputType.regexp.test(value)) {
      if (name === "email") result = "이메일 형식에 맞게 입력해주세요";
      else if (name === "pathId")
        result = "id는 영문과 숫자로만 이루어져야 합니다.";
      else result = "";
      return { ...errorInfo, [name]: result };
    }
  }

  if (inputType?.min && inputType?.max) {
    if (value.length < inputType.min || value.length > inputType.max)
      result = `${inputType.text}는 ${inputType.min}~${inputType.max}자 사이여야 합니다.`;
    else result = "";
    return { ...errorInfo, [name]: result };
  }
  return { ...errorInfo, [name]: result };
};

const RegisterFormC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const navigate = useNavigate();

  const [emailConfirmPage, setEmailConfirmPage] = useState(false);
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

  // 회원가입 버튼 클릭했을 때, 발생하는 이벤트
  const onRegister = async e => {
    e.preventDefault();

    const data = {
      ...authInfo,
    };
    try {
      await dispatch(signup(data)).unwrap();
      setEmailConfirmPage(true);
      alert(`${authInfo.email}에서 이메일 인증 바랍니다.`);
      navigate("/");
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

    // 비밀번호
    if (
      name === "password" ||
      name === "name" ||
      name === "email" ||
      name === "pathId"
    ) {
      setErrorInfo(testInput(value, name, errorInfo));
    }

    // 비밀번호 확인
    if (name === "confirmPassword") {
      if (authInfo.password !== value) {
        setErrorInfo({ ...errorInfo, [name]: "비밀번호가 일치하지 않습니다." });
      } else setErrorInfo({ ...errorInfo, [name]: "" });
    }
  };
  console.log(authInfo);

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

export default RegisterFormC;
