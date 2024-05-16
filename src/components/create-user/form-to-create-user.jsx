import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import CustomizedSnackbars from "../feedback/notif";
import usersContext from "../contexts/users.context";
import universityContext from "../contexts/university.context";
import logo from "/assets/Etudiant-20.svg";
import axiosInstance from "../../utils/axios-instance";
import InputAutocomplete from "../inputs/autocomplete";

export default function FormToCreateNewUser() {
  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const { setUsers } = useContext(usersContext);
  const { university } = useContext(universityContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [universityValue, setUniversityValue] = useState(null);
  const handleUniversityChange = (event, newValue) => {
    setUniversityValue(newValue);
  };

  const onSubmit = async (dataFromUser, event) => {
    event.preventDefault();
    dataFromUser.university = universityValue;
    console.log("data: ", dataFromUser);
    try {
      const res = await axiosInstance.post(
        "/api/admin/users/add",
        dataFromUser
      );
      console.log("response: ", res);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
      setUsers(res.data.allUsers);
      reset();
      setUniversityValue(null);
    } catch (error) {
      console.log("error lors de la connection en tant que admin: ", error);
      if (error?.response) {
        setMessageNotif(error.response.data.message);
      } else if (error?.code === "ERR_NETWORK") {
        setMessageNotif("Serveur hors service.");
      } else {
        setMessageNotif(
          "Une erreur s'est produite. Veuillez reessayer plutard."
        );
      }
      setSeverityNotif("error");
      handleSubmitOpenNotif();
    }
  };

  return (
    <>
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      <div className="FormToCreateNewUser flex w-80 min-[500px]:w-96 min-h-full flex-1 flex-col justify-center px-6 py-0 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className=" form-create-user" onSubmit={handleSubmit(onSubmit)}>
            {/* Firstname|prenom input */}
            <div>
              <label htmlFor="firstname" className="">
                First Name|Prenom *
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  {...register("firstname", {
                    required: "Veuillez indiquer le prenom du user.",
                    minLength: {
                      value: 3,
                      message: "Le prenom doit contenir au moins 3 caracteres.",
                    },
                  })}
                  type="text"
                  autoComplete="off"
                  className={`input-normal-state ${
                    errors.firstname ? "error" : "no-error"
                  }`}
                />
              </div>
              {errors.firstname && (
                <p className="text-red-500">{errors.firstname.message}</p>
              )}
            </div>

            {/* Lastname|nom input */}
            <div>
              <label htmlFor="lastname" className="">
                Last Name|Nom *
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  {...register("lastname", {
                    required: "Veuillez indiquer le nom du user.",
                    minLength: {
                      value: 3,
                      message: "Le nom doit contenir au moins 3 caracteres.",
                    },
                  })}
                  type="text"
                  autoComplete="off"
                  className={`input-normal-state ${
                    errors.lastname ? "error" : "no-error"
                  }`}
                />
              </div>
              {errors.lastname && (
                <p className="text-red-500">{errors.lastname.message}</p>
              )}
            </div>

            {/* Email address input */}
            <div>
              <label htmlFor="email" className="">
                Email address *
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Veuillez indiquer votre adresse e-mail.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Veuillez saisir une adresse e-mail valide",
                    },
                  })}
                  type="email"
                  autoComplete="off"
                  className={`input-normal-state ${
                    errors.email ? "error" : "no-error"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="">
                  Password *
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Veuillez indiquer votre mot de passe.",
                    minLength: {
                      value: 8,
                      message:
                        "Le mot de passe doit contenir au minimum 8 caractère",
                    },
                    validate: {
                      uppercase: (value) =>
                        /^(?=.*[A-Z])/.test(value) ||
                        "Le mot de passe doit contenir au moins une majuscule",
                      lowercase: (value) =>
                        /^(?=.*[a-z])/.test(value) ||
                        "Le mot de passe doit contenir au moins une minuscule",
                      number: (value) =>
                        /^(?=.*\d)/.test(value) ||
                        "Le mot de passe doit contenir au moins un chiffre",
                      specialCharacter: (value) =>
                        /^(?=.*[@#$*§])/.test(value) ||
                        "Le mot de passe doit contenir au moins un caractère spécial parmi '&#@$*§'",
                    },
                  })}
                  type="password"
                  autoComplete="off"
                  className={`input-normal-state ${
                    errors.password ? "error" : "no-error"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* University input */}
            <InputAutocomplete
              options={university}
              label="University"
              valuee={universityValue}
              onChange={handleUniversityChange}
              className={`university-autocomplete-create-new-user`}
            />

            <div>
              <button type="submit" className="submit-create-new-user">
                Créer un nouvel utilisateur
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
