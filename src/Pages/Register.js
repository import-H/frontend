import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../reducers/slices/authSlice";
const Register = () => {
  const dispatch = useDispatch();

  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    major: ""
  });

  const [showError, setShowError] = useState("sdfsdf");

  const registerEvent = (e) => {
    e.preventDefault();

    let reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@hongik.ac.kr|@g.hongik.ac.kr|@mail.hongik.ac.kr/;

    if (Object.values(authInfo).includes("") === true) {
      alert("입력하지 않은 정보가 있습니다.");
    } else if (reg.test(authInfo.email) === false) {
      alert("이메일 형식이 잘못 되었습니다.");
    } else if (authInfo.password !== authInfo.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (authInfo.nickname.length > 8) {
      alert("별명의 길이가 너무 깁니다.");
    } else {
      const data = {
        email: authInfo.email,
        password: authInfo.password,
        confirmPassword: authInfo.confirmPassword,
        nickname: authInfo.nickname,
        major: authInfo.major
      };
      dispatch(register(data));
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });

    if (name === "password") {
      if (authInfo.password.length < 8)
        setShowError("비밀번호는 8자 이상이여야 합니다.");
      else if (authInfo.password.length > 15) {
        setShowError("비밀번호는 15자 이하여야 합니다.");
      } else setShowError("");
    }

    if (name === "nickname") {
      if (authInfo.nickname.length > 8) {
        setShowError("별명은 8자 이하여야 합니다.");
      } else setShowError("");
    }
  };

  return (
    <div>
      <form onSubmit={registerEvent}>
        <div>이메일</div>
        <input type="text" name="email" onChange={onChange} />
        <div>비밀번호</div>
        <input type="password" name="password" onChange={onChange} />
        <div>비밀번호 확인</div>
        <input type="password" name="confirmPassword" onChange={onChange} />
        <div>별명</div>
        <input type="text" name="nickname" onChange={onChange} />
        <div>전공</div>
        <input type="text" name="major" onChange={onChange} />
        <button type="submit">회원가입</button>
      </form>
      <div>{showError}</div>
    </div>
  );
};

export default Register;
