import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import CustomizedSnackbars from "../feedback/notif";
import universityContext from "../contexts/university.context";
import logo from "/assets/Etudiant-20.svg";
import axiosInstance from "../../utils/axios-instance";

export default function FormToCreateNewUniversity() {
  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const { setUniversity } = useContext(universityContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (dataFromUser, event) => {
    event.preventDefault();
    // console.log("data: ", dataFromUser);
    try {
      const res = await axiosInstance.post(
        "/api/admin/universities/add",
        dataFromUser
      );
      console.log("response: ", res);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
      setUniversity(res.data.allUniversities);
      reset();
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
            {/* Title input */}
            <div>
              <label htmlFor="title" className="">
                Title *
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  {...register("title", {
                    required: "Veuillez indiquer le title du university.",
                    minLength: {
                      value: 3,
                      message: "Le title doit contenir au moins 3 caracteres.",
                    },
                  })}
                  type="text"
                  autoComplete="off"
                  className={`input-normal-state ${
                    errors.title ? "error" : "no-error"
                  }`}
                />
              </div>
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Abre input */}
            <div>
              <label htmlFor="abbreviation" className="">
                Abbreviation *
              </label>
              <div className="mt-2">
                <input
                  id="abbreviation"
                  {...register("abbreviation", {
                    required: "Veuillez indiquer l'abbreviation du university.",
                    minLength: {
                      value: 3,
                      message:
                        "L'abbreviation doit contenir au moins 3 caracteres.",
                    },
                  })}
                  type="text"
                  autoComplete="off"
                  className={`input-normal-state ${
                    errors.abbreviation ? "error" : "no-error"
                  }`}
                />
              </div>
              {errors.abbreviation && (
                <p className="text-red-500">{errors.abbreviation.message}</p>
              )}
            </div>

            {/* City input */}
            <div>
              <label htmlFor="city" className="">
                City *
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  {...register("city", {
                    required: "Veuillez indiquer le city du university.",
                    minLength: {
                      value: 3,
                      message: "Le city doit contenir au moins 3 caracteres.",
                    },
                  })}
                  type="text"
                  autoComplete="off"
                  className={`input-normal-state ${
                    errors.city ? "error" : "no-error"
                  }`}
                />
              </div>
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div>
              <button type="submit" className="submit-create-new-user">
                Ajouter un university
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
