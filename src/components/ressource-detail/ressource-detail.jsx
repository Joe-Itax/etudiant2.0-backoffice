import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";

import adminUserContext from "../contexts/admin-user.context";
import usersContext from "../contexts/users.context";
import universityContext from "../contexts/university.context";
import ressourceContext from "../contexts/ressource.context";
import axiosInstance from "../../utils/axios-instance";
import "./style.css";
import CustomizedSnackbars from "../feedback/notif";
import PdfViewer from "../pdf-viewer/pdf-viewer";
import PersistentDrawerLeft from "../persistant-drawer/persistant-drawer";
import RessourceDetailInfo from "./ressource-detail-info";

// import PropTypes from "prop-types";

// console.log(res);

export default function ResourceDetail() {
  const { id } = useParams();

  const { adminUser } = useContext(adminUserContext);
  // console.log("adminUser: ", adminUser);
  const { users } = useContext(usersContext);
  const { university } = useContext(universityContext);
  const { ressource, setRessource } = useContext(ressourceContext);

  let findUserPublishedResource;
  let findNameOfUniversityIfExist;
  let currentRessource;

  if (ressource) {
    ressource.map((res) => {
      findUserPublishedResource = users.find((user) => res.userId === user.id);

      findNameOfUniversityIfExist = university.find(
        (university) => res.universityId === university.id
      );

      if (res.id == id) {
        currentRessource = res;
      }
    });
  }

  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (dataFromUser, event) => {
    dataFromUser.authorId = adminUser.id;
    dataFromUser.targetId = currentRessource.id;

    event.preventDefault();
    reset();

    try {
      const res = await axiosInstance.post(
        `/api/ressources/${currentRessource.id}/comment`,
        dataFromUser
      );
      // console.log("res: ", res);
      setRessource(res.data.ressource);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
    } catch (error) {
      console.log("error: ", error);
      if (error.response) {
        setMessageNotif(error.response.data.message);
      }
      setMessageNotif("Une erreur s'est produite. Veuillez réessayer plutard!");
      setSeverityNotif("error");
      handleSubmitOpenNotif();
    }
  };

  // console.log("ressource: ", ressource);
  // console.log("currentRessource: ", currentRessource);

  if (!currentRessource) {
    return (
      <div className="w-full h-48 flex items-center justify-center my-24">
        <CircularProgress />
      </div>
    );
  }

  const categoriesMap = {
    Livre: "Livre",
    NoteDeCours: "Note de Cours",
    Exercices: "Exercices",
    PreparationExamen: "Préparation d'examen",
    Tp: "Travail pratique (TP)",
    Td: "Travail dirigé (TD)",
    Rapports: "Rapports",
    Resumes: "Résumés",
    Autre: "Autre",
  };

  const categorieKey = currentRessource.categorie;
  const categorie = categoriesMap[categorieKey] || "Autre";
  const handleClickModifyResource = async () => {
    alert("fichier modifié");
    try {
      const res = await axiosInstance.get(
        `/api/ressources/${currentRessource.id}`
      );

      console.log("res: ", res);

      setSeverityNotif("success");
      setMessageNotif(res.data.message);
      handleSubmitOpenNotif();
    } catch (error) {
      console.error("Erreur lors du telechargement du fichier:", error);
      setSeverityNotif("error");
      setMessageNotif(
        "Une erreur est survenue lors du telechargement du fichier. Veuillez réessayer plustard."
      );
      handleSubmitOpenNotif();
    }
  };

  const handleClickDeleteResource = async () => {
    alert("fichier supprimé");
  };

  return (
    <div className="resource-detail">
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />

      <div className="resource-content">
        {/* <div>
          {" "}
          <PdfViewer urlPdf={currentRessource.urlFichier} />
        </div> */}
        <PersistentDrawerLeft
          details={
            <RessourceDetailInfo
              currentRessource={currentRessource}
              categorie={categorie}
              findNameOfUniversityIfExist={findNameOfUniversityIfExist}
              findUserPublishedResource={findUserPublishedResource}
              handleClickModifyResource={handleClickModifyResource}
              handleClickDeleteResource={handleClickDeleteResource}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              users={users}
              // adminUser={adminUser}
            />
          }
          mainContent={<PdfViewer urlPdf={currentRessource.urlFichier} />}
        />
      </div>
    </div>
  );
}
