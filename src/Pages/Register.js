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

  /* 예외처리
 - 입력 안한 input 란이 있을 때
 => Object.values(authInfo).includes('')

 - 비밀번호, 비밀번호 확인 일치하는지 확인
 => authInfo.password!==authInfo.confirmPassword ? 'true' : 'false'

 - 이메일 형식 확인(홍익대학교 이메일) 
    -> 메일 인증번호? 받는 부분도 있어야할지도
       상대적으로 홍익대학교 이메일 잘 사용 안해서 알림 받을 이메일 적는 곳도 필요할듯
 => let reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@hongik.ac.kr/
    reg.test(email)

 - Select를 사용한 전공 선택 처리가 필요할듯
 */

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
