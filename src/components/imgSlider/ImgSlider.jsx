import React from "react";
import "./stylesImgSlider.scss";
import imgSlider from "../../assets/img/Slide-carrousel.svg";

const ImgSlider = () => {
  return (
    <figure className="imgSlider">
      <img src={`${imgSlider}`} alt="" />
    </figure>
  );
};

export default ImgSlider;
