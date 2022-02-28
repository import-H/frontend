import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { oauth } from "../reducers/slices/authSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = useParams().provider;

  //let?
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(async () => {
    try {
      await dispatch(oauth({ provider: provider, code: code }));
      navigate("/");
    } catch (e) {}
  }, []);

  return <div>loading</div>;
};

export default OAuth;
