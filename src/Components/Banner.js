import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Container } from "../Styles/theme";
import { Link } from "react-router-dom";

const BannerWrapper = styled.div`
  width: 100%;
  height: 400px;
  background: rgb(140,131,255);
  background: linear-gradient(45deg, rgba(140,131,255,1) 0%, rgba(50,169,140,1) 100%);  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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
  & > div{
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
  div {
    /* padding: 1.5rem; */
  }

  & .title {
    //color: #ffc90a;
    font-size: 2rem;
    font-weight: 500;
  }

  & .explain {
    //color: white;
    font-size: 1.4rem;
    margin: 1.6rem 0;
    margin-bottom: 3rem;
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
      &:first-child{
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
  & .BannerSetting {
    display: flex;
    align-items: center;
    flex-direction: row;
    white-space: normal;
    height: 100%;
    & .img-box{
      width: 360px;
      height: 200px;
      overflow: hidden;
      border-radius: 7px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
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
    &:hover{
      opacity: 1;
    }
  }
  > div:nth-child(${props => props.currentSlide}) {
   opacity: 1;
  }
`;

const sampleBanner = [
  {
    id: "Zjt9go9i75A",
    title: "믿어봐, 이 노래 아마 처음 들어 봤을걸?",
    explain:
      "개인적으로 이 시리즈 플리를 정말 좋아합니다 :) 신인이거나 국내에는아직 안 알려진 뮤지션분들을 소개해 줄 수 있어서 제 채널 방향성과 잘맞는다고 생각하기 때문이죠,,",
    tags: ["music", "playlist"],
  },
  {
    id: "3ugQRXRToFA",
    title: "React Testing Library Tutorial #8 - Assertions",
    explain:
      "Check out Laith's YouTube channel for more tutorials:https://www.youtube.com/chanasdasdasdadasdassdnel/UCyLN...🐱‍💻 Access the course files on GitHub:",
    tags: ["react", "jest"],
  },
  {
    id: 3,
    title: "React Testing Library Tutorial #8 - Assertions",
    explain:
      "Check out Laith's YouTube channel for more tutorials:https://www.youtube.com/channel/UCyLN...🐱‍💻 Access the course files on GitHub:",
    tags: ["react", "jest"],
  },
];

const Banner = () => {
  const TOTAL_SLIDES = 2;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const onDotClick = index => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const imageInterval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(imageInterval);
    };
  }, [currentSlide]);

  console.log(currentSlide);
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
  }, [currentSlide]);
  return (
    <BannerWrapper>
      <BannerInner>
        <div ref={slideRef}>
          {sampleBanner.map(banner => (
            <BannerArea key={banner.id} href={`https://youtu.be/${banner.id}`}>
              <div className="BannerSetting">
                <div className="img-box">
                <img
                  src={`https://img.youtube.com/vi/${banner.id}/mqdefault.jpg`}
                />
                </div>                
                <Content>
                  <div className="title">{banner.title}</div>
                  <div className="explain">{banner.explain}</div>
                  <div className="tags">
                    {banner.tags?.map(tag => (
                      <div>{tag}</div>
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
        {sampleBanner.map((_, index) => (
          <div
            key={index}
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
