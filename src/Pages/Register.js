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

  const registerEvent = (e) => {
    e.preventDefault();
    const data = {
      email: authInfo.email,
      password: authInfo.password,
      confirmPassword: authInfo.confirmPassword,
      nickname: authInfo.nickname,
      major: authInfo.major
    };
    dispatch(register(data));
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
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
    </div>
  );
};

export default Register;
