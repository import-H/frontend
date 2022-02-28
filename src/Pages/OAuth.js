import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { oauth } from "../reducers/slices/authSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = useParams().provider;

  useEffect(async () => {
    const code = new URL(window.location.href);
    try {
      await dispatch(
        oauth({
          provider: provider,
          code: code.search.split("=")[1].split("&")[0],
        }),
      );
      navigate("/");
    } catch (e) {
      alert("error");
    }
  }, []);

  return <div>{provider}에 로그인 중입니다</div>;
};

export default OAuth;
