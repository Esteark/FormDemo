import React from "react";
import "./stylesForm.scss";
import { useForm } from "react-hook-form";
import useValidate from "../../hooks/useValidate.js";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { MdError } from "react-icons/md";
import Swal, { swal } from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { setSesionUser } from "../../services/infoLocal.js";

const Form = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Iniciamos el hook personalido
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
      //enviamos la información al servidor orealizamos otras acciones en este caso almacenamos la información en el local storage
      setSesionUser(data);
      //navegamos ala otra ventana
      navigate("/success");
    }, 1000);
  };

  return (
    <>
      <Toaster />
      <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
        <h2 className="titleForm">
          Start Your Journey <br /> with a 7-day free trial{" "}
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
            type="password"
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
