import React, { useState, useRef, useEffect } from "react";
import Posts from "../../components/main/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getMainPosts, getBanner } from "../../redux/slices/mainSlice";
import Banner from "../../components/main/Banner";

const MainC = () => {
  const dispatch = useDispatch();

  const posts = useSelector(state => state.main.posts);

  // banner 관련
  const banners = useSelector(state => state.main.banners);
  const TOTAL_SLIDES = banners.length ? banners.length - 1 : 2;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  // 배너 이동 함수
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // 점 클릭 시, 해당하는 배너로 이동
  const onDotClick = index => {
    setCurrentSlide(index);
  };

  // 5초마다 banner 변경
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    const imageInterval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(imageInterval);
    };
  }, [currentSlide]);

  // 메인 화면 들어가면 배너, 포스트 불러옴
  useEffect(() => {
    dispatch(getBanner());
    dispatch(getMainPosts(0));
  }, []);

  return (
    <>
      <Banner
        banners={banners}
        onDotClick={onDotClick}
        slideRef={slideRef}
        currentSlide={currentSlide}
      />
      <Posts posts={posts} />
    </>
  );
};

export default MainC;
