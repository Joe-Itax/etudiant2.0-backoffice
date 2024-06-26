import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import { ModeEdit, Delete } from "@mui/icons-material";
import { formatTimestamp } from "../../utils/helper";
import {
  RiInformation2Fill,
  RiArrowLeftLine,
  RiCommunityFill,
  RiFocus2Fill,
  RiUserSharedFill,
  RiCheckDoubleFill,
  RiCloseFill,
} from "@remixicon/react";
import BasicPopover from "../feedback/pop-over";
import Avatar from "react-avatar";
import PropTypes from "prop-types";
import axiosInstance from "../../utils/axios-instance";
import ressourceContext from "../contexts/ressource.context";

import CustomizedSnackbars from "../feedback/notif";

export default function RessourceDetailInfo({
  currentRessource,
  categorie,
  findNameOfUniversityIfExist,
  findUserPublishedResource,
  handleClickModifyResource,
  handleClickDeleteResource,
  users,
}) {
  const { setRessource } = useContext(ressourceContext);
  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const returnOnResourcesPage = () => {
    navigate(-1);
  };
  return (
    <div className="resource-info">
      <CustomizedSnackbars
        open={openNotif}
        message={messageNotif}
        setOpen={setOpenNotif}
        severity={severityNotif}
      />
      <div className="flex cursor-pointer" onClick={returnOnResourcesPage}>
        <RiArrowLeftLine />
        <span>Voir toutes les ressources</span>
      </div>
      <span className="title-section">
        <RiInformation2Fill size={20} color="#3092FA" />{" "}
        <span>Information</span>
      </span>
      <h1>{currentRessource.title}</h1>
      <p className="description-resource">{currentRessource.description}</p>

      <div>
        <p className="flex items-center gap-2">
          <RiFocus2Fill size={30} color="#3092FA" /> Catégorie:
        </p>
        <span className="content-info">{categorie}</span>
      </div>

      {findNameOfUniversityIfExist && (
        <div>
          <p className="flex items-center gap-2">
            <RiCommunityFill size={30} color="#3092FA" /> Université:{" "}
          </p>
          <span className="content-info">
            {findNameOfUniversityIfExist.title} -{" "}
            {findNameOfUniversityIfExist.abbreviation}
          </span>
        </div>
      )}

      <div>
        <p className="flex items-center gap-2">
          <RiUserSharedFill size={30} color="#3092FA" /> Partagé par:{" "}
        </p>
        {findUserPublishedResource && (
          <span className="content-info">
            {findUserPublishedResource.firstname}{" "}
            {findUserPublishedResource.lastname}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="contained"
          color="success"
          startIcon={<ModeEdit />}
          onClick={handleClickModifyResource}
        >
          Modifier le document
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          onClick={handleClickDeleteResource}
        >
          Supprimer le document
        </Button>
      </div>
      <div>
        Ressource validé:
        {!currentRessource.isValidated ? (
          <div>
            <RiCloseFill />
          </div>
        ) : (
          <div>
            <RiCheckDoubleFill />
          </div>
        )}
      </div>
      <div className="commentaire border-t py-4">
        <span className="title">Commentaires</span>

        <div className="comments">
          {!currentRessource || !users.length > 0 ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            currentRessource.Comment.map((comment) => {
              const author = users.find((user) => user.id === comment.authorId);
              // console.log("author: ", author);
              // console.log("users: ", users);

              const deleteComment = async () => {
                try {
                  const res = await axiosInstance.delete(
                    `/api/admin/resources/${currentRessource.id}/comments/${comment.id}`
                  );
                  //   console.log("res: ", res.data);
                  setRessource(res.data.allResources);
                  setMessageNotif(res.data.message);
                  setSeverityNotif("success");
                  handleSubmitOpenNotif();
                } catch (error) {
                  // console.log("error: ", error);
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
                } finally {
                  handleClose();
                  handleSubmitOpenNotif();
                }
              };

              return (
                <div key={comment.id}>
                  <div className="comment">
                    <div className="flex items-center justify-between">
                      <div className="author">
                        <div className="profile-image">
                          {!author?.profile?.urlProfilImage ? (
                            <div className="">
                              <Avatar
                                name={`${author.firstname} ${author.lastname}`}
                                round={true}
                                size="50px"
                                src={null}
                                alt="Avatar"
                                className={`text-2xl`}
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full">
                              <img
                                src="https://lh3.googleusercontent.com/a/ACg8ocLDVlOkxeOA4vNldYH2LzZrZKmUEVSjSt1k71BaKuM4Uxxyg_k=s96-c"
                                alt=""
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                          )}
                        </div>
                        <div className="details-info">
                          <div className="name">
                            <span>
                              {author.firstname} {author.lastname}
                            </span>
                          </div>
                          <div className="createdAt">
                            <span>{formatTimestamp(comment.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <BasicPopover
                          deleteComment={deleteComment}
                          anchorEl={anchorEl}
                          handleClick={handleClick}
                          handleClose={handleClose}
                          textContent={"Supprimer le commentaire"}
                        />
                      </div>
                    </div>
                    <div className="content">
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              );
            }).reverse()
          )}
        </div>
      </div>
    </div>
  );
}
RessourceDetailInfo.propTypes = {
  className: PropTypes.node,
  currentRessource: PropTypes.object.isRequired,
  categorie: PropTypes.string.isRequired,
  findNameOfUniversityIfExist: PropTypes.object.isRequired,
  findUserPublishedResource: PropTypes.object.isRequired,
  handleClickModifyResource: PropTypes.func,
  handleClickDeleteResource: PropTypes.func,
  users: PropTypes.array.isRequired,
};
