import React from "react";
import { useDispatch } from "react-redux";
import { sampleToken } from "../reducers/slices/authSlice";

const Sample = () => {
  const dispatch = useDispatch();
  const getToken = (e) => {
    e.preventDefault();
    dispatch(sampleToken());
  };
  return (
    <div>
      <button onClick={getToken}>getToken</button>
    </div>
  );
};

export default Sample;
