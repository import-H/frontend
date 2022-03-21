import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getScrap } from "../../redux/slices/userSlice";

const Scrap = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scraps = useSelector(state => state.user.scrap);

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
          navigate(`/users/${msgId}`);
      }
    } catch (e) {
      alert(e);
    }
  };
  useEffect(async () => {
    await dispatch(getScrap(userId));
  }, []);

  return (
    <div>
      <h1>Scrap</h1>
      {scraps &&
        scraps.map(scrap => (
          <div>
            <div
            // onClick={() => {
            //   onClickMessage(scrap.postUri);
            // }}
            >
              <div>{scrap.title}</div>
              <div>{scrap.author}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Scrap;
