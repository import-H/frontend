import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Container } from "../styles/theme";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBanner } from "../redux/slices/mainSlice";

const BannerWrapper = styled.div`
  width: 100%;
  height: 400px;
  background: rgb(140, 131, 255);
  background: linear-gradient(
    45deg,
    rgba(140, 131, 255, 1) 0%,
    rgba(50, 169, 140, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1200px) {
    height: 550px;
  }
`;

const BannerInner = styled.div`
  background: #fff;
  border-radius: 7px;
  max-width: 1200px;
  width: 80%;
  margin: 0 auto;
  margin-top: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.07);
  @media (max-width: 1200px) {
    width: 90%;
  }

  @media (max-width: 980px) {
    width: 400px;
  }
  @media (max-width: 500px) {
    width: 90%;
  }

  & > div {
    display: flex;
  }
  img {
    border-radius: 7px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1.5rem;
  height: 200px;
  @media (max-width: 1200px) {
    width: calc(100% - 390px);
  }
  @media (max-width: 980px) {
    width: 100%;
    height: auto;
    margin-left: 0;
    margin-top: 2em;
    overflow-x: hidden;
  }
  & .title {
    //color: #ffc90a;
    font-size: 2rem;
    font-weight: 500;
    @media (max-width: 980px) {
      font-size: 1.6rem;
    }
  }

  & .explain {
    //color: white;
    font-size: 1.4rem;
    margin: 1.6rem 0;
    margin-bottom: 3rem;
    @media (max-width: 980px) {
      font-size: 1.2rem;
    }
  }
  & .author {
    margin-top: 1rem;
    font-size: 1.4rem;
    color: #808080;
    display: flex;
    justify-content: right;
  }
  & .tags {
    display: flex;
    flex-direction: row;

    div {
      color: white;
      background: #ccc;
      font-size: 1.3rem;
      padding: 0.3rem 1rem;
      margin-left: 1rem;
      border-radius: 7px;
      @media (max-width: 980px) {
        font-size: 1.1em;
        padding: 0.3rem 0.7rem;
        border-radius: 4px;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

const BannerArea = styled.a`
  width: 100%;
  padding: 1.5rem;
  display: block;
  height: 100%;
  flex-shrink: 0;
  @media (max-width: 1200px) {
    height: 300px;
  }
  @media (max-width: 980px) {
    height: auto;
  }
  @media (max-width: 500px) {
    padding: 1rem;
  }
  & .BannerSetting {
    display: flex;
    align-items: center;
    flex-direction: row;
    white-space: normal;
    height: 100%;
    @media (max-width: 980px) {
      flex-direction: column;
    }
    & .img-box {
      width: 360px;
      height: 200px;
      overflow: hidden;
      border-radius: 7px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      @media (max-width: 500px) {
        width: 100%;
        height: auto;
      }
      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
`;

const SliderDot = styled.div`
  position: relative;
  display: flex;
  margin-top: 1.5rem;
  > div {
    margin: 0.8rem;
    border-radius: 50%;
    background: #fff;
    width: 1rem;
    height: 1rem;
    opacity: 0.5;
    transition: all 0.3s;
    cursor: pointer;
    @media (max-width: 500px) {
      width: 0.7rem;
      height: 0.7rem;
    }
    &:hover {
      opacity: 1;
    }
  }
  > div:nth-child(${props => props.currentSlide}) {
    opacity: 1;
  }
`;

const Banner = ({ banners, onDotClick, slideRef, currentSlide }) => {
  return (
    <BannerWrapper>
      <BannerInner>
        <div ref={slideRef}>
          {banners?.length &&
            banners.map(banner => (
              <BannerArea key={banner.bannerId} href={banner.url}>
                <div className="BannerSetting">
                  <div className="img-box">
                    <img src={banner.imgUrl} />
                  </div>
                  <Content>
                    <div className="title">{banner.title}</div>
                    <div className="explain">{banner.content}</div>
                    <div className="tags">
                      {banner.tags?.map(tag => (
                        <div key={tag.name}>{tag.name}</div>
                      ))}
                    </div>
                    <div className="author">자몽</div>
                  </Content>
                </div>
              </BannerArea>
            ))}
        </div>
      </BannerInner>
      <SliderDot currentSlide={currentSlide + 1}>
        {banners?.length &&
          Array(banners.length)
            .fill(null)
            .map((_, index) => (
              <div
                key={`${index}_1`}
                onClick={() => {
                  onDotClick(index);
                }}
              ></div>
            ))}
      </SliderDot>
    </BannerWrapper>
  );
};

export default Banner;
