import React from "react";
import "./stylesHome.scss";
import Form from "../components/form/Form";
import ImgSlider from "../components/imgSlider/ImgSlider";

const Home = () => {
  return (
    <section className="container">
      <article className="secForm">
        <Form />
      </article>
      <article className="secImg">
        <ImgSlider />
      </article>
    </section>
  );
};

export default Home;
