import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLike } from "../../redux/slices/userSlice";

const Like = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likes = useSelector(state => state.user.like);

  const onClickMessage = async postUri => {
    try {
      const [msgType, msgId] = postUri.split("/");
      switch (msgType) {
        // 자유, 질문, 공지 게시판
        case "free":
        case "questions":
        case "notice":
          navigate(`/board/${msgType}/${msgId}`);
          break;
        // 개인 게시판
        default:
          navigate(`/users/${msgType}`);
      }
    } catch (e) {
      alert(e);
    }
  };
  useEffect(async () => {
    await dispatch(getLike(userId));
  }, []);

  return (
    <div>
      <h1>Like</h1>
      {likes &&
        likes.map(like => (
          <div key={like.postUri}>
            <div
              onClick={() => {
                onClickMessage(like.postUri);
              }}
            >
              <div>{like.title}</div>
              <div>{like.author}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Like;
