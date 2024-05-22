import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import usersContext from "../contexts/users.context";
import universityContext from "../contexts/university.context";
import ressourceContext from "../contexts/ressource.context";
import axiosInstance from "../../utils/axios-instance";
import "./style.css";
import CustomizedSnackbars from "../feedback/notif";
import PdfViewer from "../pdf-viewer/pdf-viewer";
import PersistentDrawerLeft from "../persistant-drawer/persistant-drawer";
import RessourceDetailInfo from "./ressource-detail-info";
import ModifyResource from "./modify-resource";
import {
  getAllUniversities,
  getAllUsers,
  getAllResources,
} from "../get-datas/get-data";

// import PropTypes from "prop-types";

// console.log(res);

export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { users, setUsers } = useContext(usersContext);
  const { university, setUniversity } = useContext(universityContext);
  const { ressource, setRessource } = useContext(ressourceContext);

  //UseEffect pour getAllUsers
  useEffect(() => {
    if (!users.length > 0) {
      getAllUsers().then((res) => {
        setUsers(res.allUsers);
      });
    }
  }, [users]);
  //UseEffect pour getAllUniversities
  useEffect(() => {
    if (!university.length > 0) {
      getAllUniversities().then((res) => {
        setUniversity(res.allUniversities);
      });
    }
  }, [university]);
  //UseEffect pour getAllResources
  useEffect(() => {
    if (!ressource.length > 0) {
      getAllResources().then((res) => {
        setRessource(res.allResources);
      });
    }
  }, [ressource]);

  let findUserPublishedResource;
  let findNameOfUniversityIfExist;
  let currentRessource;

  if (ressource) {
    ressource.map((res) => {
      findUserPublishedResource = users.find((user) => res.userId === user.id);

      if (res.id == id) {
        currentRessource = res;
        if (
          !currentRessource.universityId ||
          currentRessource.universityId == null
        ) {
          findNameOfUniversityIfExist = "";
        } else {
          findNameOfUniversityIfExist = university.find(
            (university) => university.id === currentRessource.universityId
          );
        }
      }
    });
  }

  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const [openModifyResource, setOpenModifyResource] = useState(false);

  const handleClickOpenModifyResource = () => {
    setOpenModifyResource(true);
  };
  const handleCloseModifyResource = () => {
    setOpenModifyResource(false);
  };

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
    // alert("fichier modifié");
    handleClickOpenModifyResource(true);
    /*try {
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
    }*/
  };

  const handleClickDeleteResource = async () => {
    if (
      confirm(`Etes vous sur de vouloir supprimer cette ressource ? \nInfos de la ressource: \n
  Titre: ${currentRessource.title} \n
  Description: ${currentRessource.description}\n
  Categorie: ${currentRessource.categorie} \n
  Université: ${findNameOfUniversityIfExist?.title} \n
  Partager par: ${findUserPublishedResource.firstname} ${findUserPublishedResource.lastname}`)
    ) {
      try {
        const res = await axiosInstance.delete(
          `/api/admin/resources/${currentRessource.id}`
        );

        console.log("res: ", res);

        setSeverityNotif("success");
        setMessageNotif(res.data.message);
        setRessource(res.data.allResources);
        handleSubmitOpenNotif();
        navigate(-1);
      } catch (error) {
        console.error("Erreur lors de la suppression du fichier:", error);
        if (error?.response) {
          setMessageNotif(error.response.data.message);
        } else if (error?.code === "ERR_NETWORK") {
          setMessageNotif(error.message);
        } else {
          setMessageNotif(
            "Une erreur s'est produite. Veuillez reessayer plutard."
          );
        }
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      }
    }
  };

  return (
    <div className="resource-detail">
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      <ModifyResource
        open={openModifyResource}
        handleClose={handleCloseModifyResource}
        currentRessource={currentRessource}
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
