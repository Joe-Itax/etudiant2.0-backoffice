import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import CustomizedSnackbars from "../feedback/notif";
import resourcesContext from "../contexts/ressource.context";
import universityContext from "../contexts/university.context";
import logo from "/assets/Etudiant-20.svg";
import axiosInstance from "../../utils/axios-instance";
import InputAutocomplete from "../inputs/autocomplete";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function FormToModifyResource({ currentRessource }) {
  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const { setRessource } = useContext(resourcesContext);
  const { university } = useContext(universityContext);

  const { handleSubmit } = useForm();

  let findNameOfUniversityIfExist;
  if (!currentRessource.universityId || currentRessource.universityId == null) {
    findNameOfUniversityIfExist = "";
  } else {
    findNameOfUniversityIfExist = university.find(
      (university) => university.id === currentRessource.universityId
    );
  }

  const [titleValue, setTitleValue] = useState(currentRessource.title);
  const [universityValue, setUniversityValue] = useState(
    findNameOfUniversityIfExist.title ?? ""
  );
  const [descriptionValue, setDescriptionValue] = useState(
    currentRessource.description
  );
  const [urlFichierValue, setUrlFichierValue] = useState(
    currentRessource.urlFichier
  );
  const [categorieValue, setCategorieValue] = useState(
    currentRessource.categorie
  );
  const [isValidated, setIsValidated] = useState(
    `${currentRessource.isValidated}`
  );
  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    setTitleValue(newValue);
  };
  const handleUniversityChange = (e, newValue) => {
    setUniversityValue(newValue);
  };
  const handleDescriptionChange = (e) => {
    const newValue = e.target.value;
    setDescriptionValue(newValue);
  };
  const handleLinkChange = (e) => {
    const newValue = e.target.value;
    setUrlFichierValue(newValue);
  };
  const handleCategorieChange = (e, newValue) => {
    setCategorieValue(newValue);
  };

  const handleIsValidatedChange = (event, newValue) => {
    setIsValidated(newValue);
  };

  const onSubmitModifyResource = async (dataFromUser, event) => {
    event.preventDefault();

    dataFromUser.title = titleValue;
    dataFromUser.description = descriptionValue;
    dataFromUser.urlFichier = urlFichierValue;
    dataFromUser.categorie = categorieValue;
    dataFromUser.university = universityValue == "" ? null : universityValue;
    dataFromUser.isValidated = isValidated === "true" ? true : false;

    // console.log("dataFromUser: ", dataFromUser);
    try {
      const res = await axiosInstance.put(
        `/api/admin/resources/${currentRessource.id}`,
        dataFromUser
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
            onSubmit={handleSubmit(onSubmitModifyResource)}
          >
            {/* title input */}
            <div>
              <TextField
                autoComplete="off"
                id="title"
                name="title"
                label="Title"
                className="w-full"
                value={titleValue}
                onChange={handleTitleChange}
                multiline
              />
            </div>

            {/* Description input */}
            <div>
              <TextField
                autoComplete="off"
                label="Description"
                multiline
                id="description"
                name="description"
                className="w-full"
                value={descriptionValue}
                onChange={handleDescriptionChange}
              />
            </div>

            {/* Link file input */}
            <div>
              <TextField
                autoComplete="off"
                label="Link File"
                multiline
                id="urlFichier"
                name="urlFichier"
                className="w-full"
                value={urlFichierValue}
                onChange={handleLinkChange}
              />
            </div>

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
                Modifier la ressource
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

FormToModifyResource.propTypes = {
  currentRessource: PropTypes.object,
};

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
