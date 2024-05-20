import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import CustomizedSnackbars from "../feedback/notif";
import resourcesContext from "../contexts/ressource.context";
import universityContext from "../contexts/university.context";
import adminUserContext from "../contexts/admin-user.context";
import logo from "/assets/Etudiant-20.svg";
import axiosInstance from "../../utils/axios-instance";
import InputAutocomplete from "../inputs/autocomplete";
import FilesUploader from "../file-uploader/file-uploader";
// import PropTypes from "prop-types";

export default function FormToCreateResource() {
  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const { setRessource } = useContext(resourcesContext);
  const { university } = useContext(universityContext);
  const { adminUser } = useContext(adminUserContext);

  const { handleSubmit, register } = useForm();

  const [universityValue, setUniversityValue] = useState(null);
  const [categorieValue, setCategorieValue] = useState("Autre");
  const [isValidated, setIsValidated] = useState(false);

  const handleUniversityChange = (event, newValue) => {
    setUniversityValue(newValue);
  };
  const handleCategorieChange = (e, newValue) => {
    setCategorieValue(newValue);
  };

  const handleIsValidatedChange = (event, newValue) => {
    setIsValidated(newValue);
  };

  const [files, setFiles] = useState([]);

  const onSubmitCreateResource = async (dataFromUser, event) => {
    event.preventDefault();

    dataFromUser.title = dataFromUser.titleC;
    delete dataFromUser.titleC;
    dataFromUser.description = dataFromUser.descriptionC;
    delete dataFromUser.descriptionC;
    dataFromUser.categorie = categorieValue;
    dataFromUser.university = universityValue;
    dataFromUser.isValidated = isValidated === "true" ? true : false;
    dataFromUser.files = files;
    dataFromUser.userId = adminUser.id;

    const formData = new FormData();
    formData.append("title", dataFromUser.title);
    formData.append("description", dataFromUser.description);
    formData.append("categorie", dataFromUser.categorie);
    formData.append("university", dataFromUser.university);
    formData.append("isValidated", dataFromUser.isValidated);
    formData.append("userId", dataFromUser.userId);
    dataFromUser.files.forEach((file) => {
      formData.append("files", file.file);
    });

    console.log("dataFromUser: ", dataFromUser);
    console.log("formData: ", formData);

    try {
      const res = await axiosInstance.post(
        `/api/admin/resources/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response: ", res);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
      setRessource(res.data.allResources);
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
          <form
            className=" form-create-user"
            onSubmit={handleSubmit(onSubmitCreateResource)}
          >
            {/* Files input */}
            <div>
              <FilesUploader files={files} setFiles={setFiles} />
            </div>

            {/* title input */}
            <div>
              <label htmlFor="titleC">Title</label>

              <textarea
                rows={1}
                type="text"
                className="w-full h-14 rounded-md hover:border-black focus:border-2 focus:border-[#3584E4] border-[rgba(0,0,0,0.28)] text-[rgba(0,0,0,0.87)] resize-none"
                name="titleC"
                id="titleC"
                {...register("titleC", {
                  required: true,
                })}
              ></textarea>
            </div>

            {/* Description input */}
            <div>
              <label htmlFor="descriptionC">Description</label>

              <textarea
                rows={1}
                type="text"
                className="w-full h-14 rounded-md hover:border-black focus:border-2 focus:border-[#3584E4] border-[rgba(0,0,0,0.28)] text-[rgba(0,0,0,0.87)] resize-none"
                name="descriptionC"
                id="descriptionC"
                {...register("descriptionC", {
                  required: true,
                })}
              ></textarea>
            </div>

            {/* Link file input */}
            {/* <div>
              <label htmlFor="urlFichierC">Link File</label>

              <textarea
                rows={1}
                type="text"
                className="w-full h-14 rounded-md hover:border-black focus:border-2 focus:border-[#3584E4] border-[rgba(0,0,0,0.28)] text-[rgba(0,0,0,0.87)] resize-none"
                name="urlFichierC"
                id="urlFichierC"
                {...register("urlFichierC", {
                  required: true,
                })}
              ></textarea>
            </div> */}

            {/* Categorie input */}
            <div>
              <InputAutocomplete
                options={categorie}
                label="Categorie"
                valuee={categorieValue}
                onChange={handleCategorieChange}
                className={``}
              />
            </div>

            {/* University input */}
            <div>
              <InputAutocomplete
                options={university}
                label="University"
                valuee={universityValue}
                onChange={handleUniversityChange}
                className={``}
              />
            </div>

            {/* isValidated input */}
            <div>
              <InputAutocomplete
                options={validateResource}
                label="isValidated"
                valuee={isValidated}
                onChange={handleIsValidatedChange}
                className={``}
              />
            </div>

            <div>
              <button type="submit" className="submit-create-new-user">
                Créer la ressource
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// FormToCreateResource.propTypes = {
//   currentRessource: PropTypes.object,
// };

const categorie = [
  {
    id: 1,
    title: "Livre",
  },
  {
    id: 2,
    title: "NoteDeCours",
  },
  {
    id: 3,
    title: "Exercices",
  },
  {
    id: 4,
    title: "PreparationExamen",
  },
  {
    id: 5,
    title: "Tp",
  },
  {
    id: 6,
    title: "Td",
  },
  {
    id: 7,
    title: "Rapports",
  },
  {
    id: 8,
    title: "Resumes",
  },
  {
    id: 9,
    title: "Autre",
  },
];
const validateResource = [
  {
    id: 1,
    title: true,
  },
  {
    id: 2,
    title: false,
  },
];
