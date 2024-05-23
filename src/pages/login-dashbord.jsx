import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import CustomizedSnackbars from "../components/feedback/notif";
import authAdminStatusContext from "../components/contexts/auth-admin.context";
import logo from "/assets/Etudiant-20.svg";
import axiosInstance from "../utils/axios-instance";

export default function LoginDashbord() {
  const navigate = useNavigate();
  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const { isAdminAuthenticated, setAdminIsAuthenticated } = useContext(
    authAdminStatusContext
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataFromUser, event) => {
    event.preventDefault();
    // console.log("data: ", dataFromUser);
    try {
      const res = await axiosInstance.post(
        "/api/admin/auth/login",
        dataFromUser
      );
      // console.log("response: ", res);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
      setAdminIsAuthenticated(res.data.isAdminAuthenticated);
    } catch (error) {
      // console.log("error lors de la connection en tant que admin: ", error);
      setAdminIsAuthenticated(false);
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

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate("/");
    }
  }, [isAdminAuthenticated, navigate]);

  return (
    <>
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/"}>
            {" "}
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Your Company"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Se connecter entant qu&apos;Admin
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
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
                  autoComplete="email"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6 ${
                    errors.email
                      ? "ring-red-300 focus:ring-2 focus:ring-inset focus:ring-red-600"
                      : "ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <button
                    onClick={() => navigate("/", { replace: true })}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Mot de passe oublié?
                  </button>
                </div>
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
                  autoComplete="current-password"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6 ${
                    errors.password
                      ? "ring-red-300 focus:ring-2 focus:ring-inset focus:ring-red-600"
                      : "ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Se connecter
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            T&apos;es pas Admin? ça alors, tu fais quoi ici ???{" "}
            <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              clique ici
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
