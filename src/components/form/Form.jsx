import React, { useState } from "react";
import "./stylesForm.scss";
import { useForm } from "react-hook-form";
import useValidate from "../../hooks/useValidate.js";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { MdError } from "react-icons/md";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { setSesionUser } from "../../services/infoLocal.js";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";

const Form = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Iniciamos el hook personalizado que me ayuda a validar mediante expresiones regulares las especificaciones requeridas
  //Tales como , el nombre no debe estar vacio , el email debe de ser uno válido
  //La contraseña debe contener almenos una mayuscula , una minuscula , un carácter especial y 8 carácteres
  const validacion = useValidate();

  //   la siguiente función valida la información del formulario
  const onSubmitForm = async (data) => {
    //Si todo es correcto
    toast.success("Usuario registrado correctamente");
    setTimeout(() => {
      Swal.fire({
        position: "center",
        icon: "info",
        title: `Información del usuario ${data.nom} registrada satisfactoriamente`,
        showConfirmButton: false,
        timer: 1500,
      });
      //enviamos la información al servidor o realizamos otras acciones en este caso almacenamos la información en el local storage
      setSesionUser(data);
      //navegamos ala otra ventana
      navigate("/success");
    }, 1000);
  };

  const showHidePassWord = () => {
    setShow(!show);
  };

  return (
    <>
      <Toaster />
      <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
        <h2 className="titleForm">
          Start Your Journey <br /> with a 7-day free trial
        </h2>
        <label htmlFor="" className="labelForm">
          First name*
          <input
            type="text"
            placeholder="Enter your first name"
            className="inputForm"
            {...register("nom", {
              required: "El campo nombre es requerido",
            })}
          />
        </label>
        <label htmlFor="" className="labelForm">
          Email*
          <input
            type="email"
            placeholder="Enter your email"
            className="inputForm"
            {...register("email", {
              required: "El email es un campo requerido",
              pattern: {
                value: validacion.email,
                message: "Ingresa un correo válido por favor",
              },
            })}
          />
        </label>
        <label htmlFor="" className="labelForm">
          Password*
          <input
            type={!show ? "password" : "text"}
            placeholder="Create a password"
            className="inputForm"
            {...register("pass", {
              required: "El password es requerido",
              pattern: {
                value: validacion.password,
                message:
                  "La contraseña debe contener almenos una mayuscula un numero y un caracter especial y contar con 8 caráteres",
              },
            })}
          />
          {!show ? (
            <FaRegEye
              className="iconShow"
              onClick={() => {
                showHidePassWord();
              }}
            />
          ) : (
            <IoEyeOffOutline
              className="iconShow"
              onClick={() => {
                showHidePassWord();
              }}
            />
          )}
        </label>

        <section className="secErrors">
          {errors.nom ? (
            <span className="lblError">
              <MdError className="iconError" /> {errors.nom.message}
            </span>
          ) : (
            <></>
          )}
          {errors.email ? (
            <span className="lblError">
              <MdError className="iconError" /> {errors.email.message}
            </span>
          ) : (
            <></>
          )}

          {errors.pass ? (
            <span className="lblError">
              <MdError className="iconError" /> {errors.pass.message}
            </span>
          ) : (
            <></>
          )}
        </section>

        <section className="secSend">
          <button className="btnForm">Create account</button>
          <h4>
            Already have an account? <a>Log in</a>
          </h4>
        </section>
      </form>
    </>
  );
};

export default Form;
