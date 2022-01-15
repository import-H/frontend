import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../reducers/slices/authSlice";
const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [major, setMajor] = useState("");
  console.log(email);

  const registerEvent = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      nickname: nickname,
      major: major
    };
    dispatch(register(data));
  };

  return (
    <div>
      <form onSubmit={registerEvent}>
        <div>이메일</div>
        <input
          type="text"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div>비밀번호</div>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.vlaue);
          }}
        />
        <div>비밀번호 확인</div>
        <input
          type="password"
          name="confirm_password"
          onChange={(e) => {
            setConfirmPassword(e.target.vlaue);
          }}
        />
        <div>별명</div>
        <input
          type="text"
          name="nickname"
          onChange={(e) => {
            setNickname(e.target.vlaue);
          }}
        />
        <div>전공</div>
        <input
          type="text"
          name="major"
          onChange={(e) => {
            setMajor(e.target.vlaue);
          }}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Register;
