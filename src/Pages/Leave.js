// react
import React, { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/slices/authSlice";

// styled-components
import styled from "styled-components";
import GlobalStyle from "../Styles/Globalstyle.js";
import { Button, Input, FlexContainer } from "../Styles/theme.js";

// react-router-dom
import { useNavigate } from "react-router-dom";

// style
const Label = styled.div`
  font-size: 1.4em;
  margin: 10px 0 5px 0;
  color: #666;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 25px;
`;

const Leave = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    const [showError, setShowError] = useState("");

    const [authInfo, setAuthInfo] = useState({
      password: "",
    });

    // 회원가입 버튼 클릭했을 때, 발생하는 이벤트
    const leaveEvent = async e => {
        e.preventDefault();

        // form 검사
        if (Object.values(authInfo).includes("") === true) {
        alert("비밀번호를 입력해주세요.");
        } else {
        const data = {
            password: authInfo.password,
        };
        // await dispatch(login(data));
        }
    };

      // input에 변경이 생겼을 경우, 발생하는 이벤트
    const onChange = e => {
        const { value, name } = e.target;
        setAuthInfo({ ...authInfo, [name]: value });
    };

    useEffect(() => {
        if(!isAuth) {
            navigate("/");
        }
    })

    return (
        <FlexContainer>
            <GlobalStyle />
                <form onSubmit={leaveEvent}>
                    <Label>비밀번호</Label>
                    <Input type="password" name="password" onChange={onChange} />

                    <SubmitButton type="submit">회원탈퇴</SubmitButton>
                </form>
        </FlexContainer>
    )
}

export default Leave;