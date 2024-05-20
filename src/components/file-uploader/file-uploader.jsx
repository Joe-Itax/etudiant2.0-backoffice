import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import LoadingButton from "@mui/lab/LoadingButton";

import { Dropzone, FileMosaic, FilesUiProvider } from "@files-ui/react";
import "./file-uploader.css";
import { RiDeleteBinLine } from "@remixicon/react";
import { fileSizeFormater } from "@files-ui/react";

import PropTypes from "prop-types";

export default function FilesUploader({ files, setFiles }) {
  const [loading, setLoading] = useState(false);

  /*const [formData, setFormData] = useState({
    title: "",
    description: "",
    categorie: "",
    university: "",
  });*/

  /*const handleSubmit = async () => {
    if (
      files.length === filesData.length &&
      filesData.every(
        (fileData) =>
          fileData.title.trim() !== "" && fileData.description.trim() !== ""
      )
    ) {
      setLoading(true);
      const formDataToSend = new FormData();
      const isFileDuplicate = (formData, file) => {
        for (const [key, value] of formData.entries()) {
          // Vérifie si les caractéristiques du fichier correspondent à un fichier existant dans formData
          if (
            key === "files" &&
            value.name === file.name &&
            value.size === file.size &&
            value.type === file.type
          ) {
            return true; // Le fichier est un doublon
          }
        }
        return false; // Le fichier n'est pas un doublon
      };

      files.forEach((file) => {
        const fileData = filesData.find((data) => data.id === file.id);

        if (fileData) {
          // Utilisez la fonction `isFileDuplicate` pour garantir que le fichier n'est pas déjà ajouté
          if (!isFileDuplicate(formDataToSend, file.file)) {
            formDataToSend.append("files", file.file); // Ajoutez le fichier uniquement s'il n'est pas un doublon
            formDataToSend.append(`title`, fileData.title);
            formDataToSend.append(`description`, fileData.description);
            formDataToSend.append(`categorie`, fileData.categorie);
            formDataToSend.append(`university`, fileData.university);
          } else {
            console.warn(
              `Le fichier "${file.file.name}" est déjà dans FormData.`
            );
          }
        } else {
          setLoading(false);
          console.error("Données du fichier manquantes :", file);
        }
      });

      try {
        const res = await axiosInstance.post(
          `/api/admin/resources/add`,
          formDataToSend
        );

        setMessageNotif(res.data.message);
        setSeverityNotif("success");
        handleSubmitOpenNotif();
        setTimeout(() => {
          navigate("/upload/success", { state: { from: "/upload" } });
        }, 2000);
        // console.log("ress: ", res);
        // console.log("formDataToSend: ", formDataToSend);
      } catch (error) {
        setLoading(false);
        setSeverityNotif("error");
        console.error("Erreur lors de la soumission :", error);
        if (
          error?.response?.status === 404 ||
          error?.response?.status === 400
        ) {
          setMessageNotif(error.response.data.message);
        } else if (error.code === "ERR_NETWORK") {
          setMessageNotif("Serveur hors service.");
        } else if (error.response.data) {
          setMessageNotif(error.response.data.message);
        } else {
          setMessageNotif("Une erreur s'est produite.");
        }
        handleSubmitOpenNotif();
      }
    } else {
      setLoading(false);
      alert(
        "Veuillez remplir tous les champs obligatoires pour chaque fichier."
      );
    }
  };*/

  const updateFiles = (incommingFiles) => {
    //do something with the files
    setFiles(incommingFiles);
  };
  // console.log(files);
  const removeFile = (id) => {
    // Supprime un fichier de la liste
    setFiles(files.filter((x) => x.id !== id));
    // console.log(files);
  };

  const validateUniqueFiles = (file) => {
    const errorList = [];
    let isFileAlreadyExist = false;
    const fileExists = files.some(
      (existingFile) => existingFile.name === file.name
    );
    if (fileExists) {
      isFileAlreadyExist = false;
      errorList.push(`Ce fichier semble avoir déjà été partagé : ${file.name}`);
    } else {
      isFileAlreadyExist = true;
    }
    return { valid: isFileAlreadyExist, errors: errorList };
  };

  return (
    <div className="custom-uploader">
      <FilesUiProvider
        config={{
          localization: "FR-fr",
        }}
      >
        <Dropzone
          className="w-full flex text-[10px]"
          label="Glissez-déposez vos fichiers ici ou cliquez pour téléverser."
          accept="application/pdf"
          maxFileSize={Number.parseFloat(5 * 1024 * 1024).toFixed(0)}
          maxFiles={1}
          onChange={updateFiles}
          value={files}
          name="files"
          autoClean
          groupUpload
          footerConfig={{
            customFooter: (
              <div
                style={{
                  padding: ".2rem",
                }}
                className="bg-cyan-100 text-sm mt-6 py-4"
              >
                Fichiers supportés : <b>.pdf</b>
              </div>
            ),
          }}
          validator={validateUniqueFiles}
        >
          {files.map((file) => (
            <FileMosaic key={file.id} {...file} onDelete={removeFile} />
          ))}
        </Dropzone>
      </FilesUiProvider>
    </div>
  );
}

FilesUploader.propTypes = {
  files: PropTypes.array,
  setFiles: PropTypes.func,
};
