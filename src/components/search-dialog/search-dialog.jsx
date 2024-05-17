// import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  useInstantSearch,
} from "react-instantsearch";
import algoliasearch from "algoliasearch";
import { RiBookFill } from "@remixicon/react";

import AlertDialog2 from "../feedback/alert-dialog2";
import PropTypes from "prop-types";
import "./style.css";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCHAPI_KEY
);

function Hit({ hit }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    navigate("/login", { state: { from: `/resources/${hit.id}` } });
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log("hittt: ", hit);
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
  const categorieKey = hit.categorie;
  const categorie = categoriesMap[categorieKey] || "Autre";

  // console.log("hit: ", hit);

  return (
    <div className="search-result">
      <AlertDialog2
        open={open}
        handleClose={handleClose}
        handleClickToLogin={handleLinkClick}
      />

      {hit ? (
        <Link className="" to={`/resources/${hit.id}`}>
          <div>
            <RiBookFill className="book-icon" color="#967fd6" />
          </div>
          <div className="search-result-info">
            <h3 className="">
              <Highlight attribute="title" hit={hit} />
            </h3>
            <p className="categorie">categorie: {categorie}</p>
          </div>
        </Link>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
Hit.propTypes = {
  hit: PropTypes.object,
};
function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch();
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}
NoResultsBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
};

function NoResults() {
  const { indexUiState } = useInstantSearch();
  return (
    <div>
      <p>
        Aucun document correspondant à votre recherche{" "}
        <q>
          <b>{indexUiState.query}</b>
        </q>{" "}
        n&apos;a été trouvé.
      </p>{" "}
      <p>Essayez une autre recherche avec des mots-clés différents.</p>
    </div>
  );
}

function SearchResults({ children }) {
  const { indexUiState } = useInstantSearch();
  // console.log("indexUiState: ", indexUiState);
  // console.log("query: ", indexUiState.query);

  return (
    <div>
      {indexUiState.query ? (
        children
      ) : (
        <div className="px-4">
          <p>Veuillez entrer une requête pour voir les résultats.</p>
        </div>
      )}
    </div>
  );
}
SearchResults.propTypes = {
  children: PropTypes.node,
};

export default function SearchDialog({
  openSearchDialog,
  scroll,
  handleCloseSearchDialog,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (openSearchDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openSearchDialog]);

  return (
    <>
      <Dialog
        className="search-dialog"
        open={openSearchDialog}
        onClose={handleCloseSearchDialog}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Recherche rapide</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <InstantSearch searchClient={searchClient} indexName="etudiant2.0">
              <div className="search-box-container">
                <SearchBox
                  placeholder="Rechercher un document ..."
                  onFocus={handleFocus}
                  autoFocus
                  onBlur={handleBlur}
                  className={`search-box ${
                    isFocused ? "search-box-focused" : ""
                  }`}
                />
              </div>
              <div className="hits-container">
                <SearchResults>
                  <NoResultsBoundary fallback={<NoResults />}>
                    <Hits hitComponent={Hit} />
                  </NoResultsBoundary>
                </SearchResults>
              </div>
            </InstantSearch>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSearchDialog}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SearchDialog.propTypes = {
  openSearchDialog: PropTypes.bool.isRequired,
  scroll: PropTypes.string.isRequired,
  handleCloseSearchDialog: PropTypes.func.isRequired,
};
