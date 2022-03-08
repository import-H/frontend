import React from "react";
import { Setting, BannerArea, Content } from "../../pages/Admin";
const BannerList = ({ onRemoveBanner, banners }) => {
  return (
    <>
      {banners.map(banner => (
        <Setting key={banner.bannerId}>
          <BannerArea href={banner.url}>
            <div className="BannerSetting">
              <div className="img-box">
                <img src={banner.imgUrl} />
              </div>
              <Content>
                <div className="title">{banner.title}</div>
                <div className="explain">{banner.content}</div>
                <div className="tags">
                  {banner.tags?.map(tag => (
                    <div>{tag.name}</div>
                  ))}
                </div>
                <div className="author">자몽</div>
              </Content>
            </div>
          </BannerArea>
          <button
            onClick={() => {
              onRemoveBanner(banner.bannerId);
            }}
          >
            -
          </button>
        </Setting>
      ))}
    </>
  );
};

export default BannerList;
