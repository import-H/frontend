import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const BannerWrapper = styled.div`
  margin: 0 auto;
  border: 1px solid #f0f0f0;
  border-radius: 7px;
  height: 20rem;
  position: relative;
  width: 80%;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
  img {
    border-radius: 7px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    padding: 1rem;
  }

  & .title {
    //color: #ffc90a;
    font-size: 2rem;
  }

  & .explain {
    //color: white;
    font-size: 1.4rem;
  }
  & .author {
    font-size: 1.3rem;
    color: #808080;
    display: flex;
    justify-content: right;
  }
`;

const sampleBanner = [
  {
    id: 1,
    title: "믿어봐, 이 노래 아마 처음 들어 봤을걸?",
    explain:
      "개인적으로 이 시리즈 플리를 정말 좋아합니다 :) 신인이거나 국내에는아직 안 알려진 뮤지션분들을 소개해 줄 수 있어서 제 채널 방향성과 잘맞는다고 생각하기 때문이죠,,",
    url: "https://img.youtube.com/vi/Zjt9go9i75A/mqdefault.jpg",
  },
  {
    id: 2,
    title: "React Testing Library Tutorial #8 - Assertions",
    explain:
      "Check out Laith's YouTube channel for more tutorials:https://www.youtube.com/channel/UCyLN...🐱‍💻 Access the course files on GitHub:",
    url: "https://img.youtube.com/vi/3ugQRXRToFA/mqdefault.jpg",
  },
  {
    id: 3,
    title: "React Testing Library Tutorial #8 - Assertions",
    explain:
      "Check out Laith's YouTube channel for more tutorials:https://www.youtube.com/channel/UCyLN...🐱‍💻 Access the course files on GitHub:",
    url: "https://img.youtube.com/vi/3ugQRXRToFA/mqdefault.jpg",
  },
];

const SliderContent = styled.div`
  width: 100%;
  padding: 1rem;
  display: inline-block;
`;

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
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
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
    <div>
      <BannerWrapper>
        <div ref={slideRef}>
          {sampleBanner.map(banner => (
            <SliderContent keys={banner.id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  whiteSpace: "normal",
                }}
              >
                <img src={banner.url} />
                <Content>
                  <div className="title">{banner.title}</div>
                  <div className="explain">{banner.explain}</div>
                  <div className="author">자몽</div>
                </Content>
              </div>
            </SliderContent>
          ))}
        </div>
      </BannerWrapper>
      <button onClick={prevSlide}>left</button>
      <button onClick={nextSlide}>right</button>
    </div>
  );
};

export default Banner;
