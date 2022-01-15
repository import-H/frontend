import React, { useEffect, useState } from "react";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [major, setMajor] = useState("");

  const onEmailHandler = (event) => setEmail(event.currentTarget.value);

  const registerEvent = () => {
    //if(이메일 형식 검사)
    //api (연동)
  };

  return (
    <div>
      <form>
        <div>이메일</div>
        <input type="text" name="email" />
        <div>비밀번호</div>
        <input type="password" name="password" />
        <div>비밀번호 확인</div>
        <input type="password" name="confirm_password" />
        <div>별명</div>
        <input type="text" name="nickname" />
        <div>전공</div>
        <input type="text" name="major" />
        <button onClick={registerEvent}>회원가입</button>
      </form>
    </div>
  );
};

export default Register;

/*
{
	"email" : "string",
	"password" : "string",
	"confirm_password": "string",
	"nickname": "string",
	"major": "string"
}
*/
