/*import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function InputGen({ className, typeInput, idInput }) {
  const [isFocusField, setIsFocusField] = useState(false);

  const changeStateField = () => {
    setIsFocusField(true);
  };
  const changeStateFieldFalse = () => {
    setIsFocusField(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  return (
    <input
      //   className={`inputControlled ${errors.email ? "error" : "noError"}`}
      className={className}
      onFocus={changeStateField}
      type={typeInput}
      id={idInput}
      {...register("email", {
        required: "Veuillez indiquer votre adresse e-mail.",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Veuillez saisir une adresse e-mail valide",
        },
      })}
      onBlur={(e) => {
        const emailValue = getValues("email");
        if (!emailValue) {
          changeStateFieldFalse();
        }
        // Appeler la fonction onBlur fournie par react-hook-form pour conserver sa fonctionnalité
        register("email").onBlur(e);
      }}
    />
  );
}

InputGen.propTypes = {
  className: PropTypes.node,
  typeInput: PropTypes.string.isRequired,
  idInput: PropTypes.string.isRequired,
  register: PropTypes.node,
};
*/
