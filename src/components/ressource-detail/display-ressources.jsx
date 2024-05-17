import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiBookFill, RiSearch2Line } from "@remixicon/react";
import { CircularProgress } from "@mui/material";

import authAdminStatusContext from "../contexts/auth-admin.context";
import ressourceContext from "../contexts/ressource.context";

import AlertDialog2 from "../feedback/alert-dialog2";
import SearchDialog from "../search-dialog/search-dialog";

export default function DisplayRessources() {
  const { isAdminAuthenticated } = useContext(authAdminStatusContext);
  const { ressource } = useContext(ressourceContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpenSearchDialog = (scrollType) => () => {
    setOpenSearchDialog(true);
    setScroll(scrollType);
  };
  const handleCloseSearchDialog = () => {
    setOpenSearchDialog(false);
  };

  const handleClickOpen = (e) => {
    if (!isAdminAuthenticated) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SearchDialog
        scroll={scroll}
        openSearchDialog={openSearchDialog}
        handleCloseSearchDialog={handleCloseSearchDialog}
      />
      <div className="hero">
        <div className="self-center">
          <RiBookFill color="#967fd6" size={150} />
        </div>
        <h1 className="text-center">Recherche rapide</h1>

        <button
          className="flex items-start text-white rounded-lg gap-3 bg-slate-700 hover:bg-slate-600 self-center px-6 py-4 select-none cursor-pointer"
          onClick={handleClickOpenSearchDialog("paper")}
        >
          <div>
            <RiSearch2Line />
          </div>
          <div>
            <span>Recherche rapide ...</span>
          </div>
        </button>
      </div>
      <div className="flex flex-col md:p-16 min-[500px]:px-8 py-12 px-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-5">
            Ressources
          </h2>
        </div>
        {ressource.length > 0 ? (
          <>
            {ressource
              .map((res) => {
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
                const categorieKey = res.categorie;
                const categorie = categoriesMap[categorieKey] || "Autre";

                // console.log("ressource: ", res);

                return (
                  <div key={res.id} className={`${res.id}`}>
                    <AlertDialog2
                      open={open}
                      handleClose={handleClose}
                      handleClickToLogin={() => {
                        navigate("/login", {
                          state: { from: `/ressources/${res.id}` },
                        });
                      }}
                    />
                    <Link
                      className={`flex items-start gap-3  rounded-3xl py-6 px-2 ${
                        res.isValidated
                          ? "bg-[#f1f7fe] hover:bg-[#cedceb]"
                          : "bg-[#fad5d5] hover:bg-[#f8c4c4]"
                      }`}
                      to={`/resources/${res.id}`}
                      onClick={handleClickOpen}
                    >
                      <div>
                        <RiBookFill color="#967fd6" size={25} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[#3092fa] font-semibold text-xl">
                          {res.title}
                        </h3>
                        <p className="categorie text-gray-600 text-[1rem]">
                          categorie: {categorie}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })
              .reverse()}
          </>
        ) : (
          <div>
            <CircularProgress></CircularProgress>
          </div>
        )}
      </div>
    </>
  );
}
