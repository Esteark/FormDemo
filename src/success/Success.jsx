import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { IoChevronBackCircle } from "react-icons/io5";
import "./stylesSuccess.scss";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const regresar = () => {
    navigate("/");
  };

  return (
    <section className="secSucc">
      <article className="card">
        <section className="card__1">
          <BsCheckCircle className="iconCard" />
          <h2 className="titleCard">Success!</h2>
          <h3 className="pCard">Account Created Successfully!</h3>
        </section>
        <h4 className="pSuccess">Awesome!</h4>
        <IoChevronBackCircle className="iconBack" onClick={regresar} />
      </article>
    </section>
  );
};

export default Success;
