import React, { useEffect } from "react";
import GlobalStyle from "../Styles/Globalstyle";
import { Container } from "../Styles/theme";
import styled from "styled-components";
import noneProfileImg from "../images/none_profile_image.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../reducers/slices/userSlice";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;

  & .userBox{
    width: 20%;
    @media(max-width: 1200px){
      width: 33%;
    }

    @media(max-width: 768px){
      width: 50%;
    }
  }
`;

const User = styled.div`
  margin: 0 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 7px;
  padding: 1rem;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.07);

  @media(max-width: 768px){
      margin: 0 1rem;
      margin-bottom: 2rem;
    }

  & img {
    width: 4rem;
    border-radius: 7px;
    object-fit: cover;
    object-position: center;
  }

  .userName {
    padding: 1rem;
    font-size: 1.4rem;
  }
`;

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <Container>
      <GlobalStyle />
      <Wrapper>
        {users &&
          users.map(user => (
            <div className="userBox" key={user?.userId}>
              {user?.pathId && (
                <Link to={`${user.pathId}`}>
                  <User>
                    {user?.profileImage ? (
                      <img src={user.profileImage} />
                    ) : (
                      <img src={noneProfileImg} />
                    )}
                    <div className="userName">{user.nickname}</div>
                  </User>
                </Link>
              )}
            </div>
          ))}
      </Wrapper>
    </Container>
  );
};

export default UserList;
