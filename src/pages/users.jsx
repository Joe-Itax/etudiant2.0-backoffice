import { Box, Button, CircularProgress } from "@mui/material";
import { Add, Cancel, Delete, Edit, Save, Replay } from "@mui/icons-material";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import StyledDataGrid from "../components/styled-data-grid/styled-data-grid";
import React, { useContext, useEffect, useState } from "react";
import usersContext from "../components/contexts/users.context";
import universityContext from "../components/contexts/university.context";
// import PropTypes from "prop-types";

import axiosInstance from "../utils/axios-instance";
import CreateNewUser from "../components/create-user/create-user";
import CustomizedSnackbars from "../components/feedback/notif";
import {
  getAllUsers,
  getAllUniversities,
} from "../components/get-datas/get-data";

import "./style.css";

export default function Users() {
  const [messageNotif, setMessageNotif] = useState("");
  const [severityNotif, setSeverityNotif] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const handleSubmitOpenNotif = () => {
    setOpenNotif(true);
  };
  const { users, setUsers } = useContext(usersContext);
  const { university, setUniversity } = useContext(universityContext);

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

  const findNameUniversityById = (id) => {
    return university.find((university) => university.id === id).title;
  };
  const findAbbreUniversityById = (id) => {
    return university.find((university) => university.id === id).abbreviation;
  };

  const initialRows = users.map((user) => {
    return {
      id: user.id,
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      university: user.universityId
        ? findNameUniversityById(user.universityId)
        : "Null",
      univ_abrev: user.universityId
        ? findAbbreUniversityById(user.universityId)
        : "Null",
      role: user.role,
      isDeleted: user.isDeleted,
      createdAt: `${user.createdAt.slice(0, 10)}  ${user.createdAt.slice(
        10,
        16
      )}`,
      updatedAt: `${user.updatedAt.slice(0, 10)}  ${user.updatedAt.slice(
        10,
        16
      )}`,
    };
  });

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  //UseEffetc pour ecouter les changes sur les users
  useEffect(() => {
    // console.log("users: ", users);
    setRows(
      users.map((user) => {
        return {
          id: user.id,
          lastname: user.lastname,
          firstname: user.firstname,
          email: user.email,
          university: user.universityId
            ? findNameUniversityById(user.universityId)
            : "Null",
          univ_abrev: user.universityId
            ? findAbbreUniversityById(user.universityId)
            : "Null",
          role: user.role,
          isDeleted: user.isDeleted,
          createdAt: `${user.createdAt.slice(0, 10)}  ${user.createdAt.slice(
            10,
            16
          )}`,
          updatedAt: `${user.updatedAt.slice(0, 10)}  ${user.updatedAt.slice(
            10,
            16
          )}`,
        };
      })
    );
  }, [users]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id) => {
    if (
      confirm(`Etes vous sur de vouloir supprimer cet utilisateur ? \nInfos du user: \n
    Nom: ${rows.find((row) => row.id === id).lastname} \n
    Prenom: ${rows.find((row) => row.id === id).firstname} \n
    Email: ${rows.find((row) => row.id === id).email} \n
    Role: ${rows.find((row) => row.id === id).role}`)
    ) {
      try {
        const res = await axiosInstance.delete(`/api/admin/users/update/${id}`);

        // console.log("res handleDeleteClick: ", res);
        setRows(rows.filter((row) => row.id !== id));
        setUsers(res.data.allUsers);
        setMessageNotif(res.data.message);
        setSeverityNotif("success");
        handleSubmitOpenNotif();
      } catch (error) {
        // console.log("error: ", error);
        if (error?.response) {
          setMessageNotif(error.response.data.message);
        } else if (error?.message) {
          setMessageNotif(error?.message);
        } else {
          setMessageNotif(
            "Une erreur s'est produite. Veuillez reessayer plutard."
          );
        }
        setSeverityNotif("error");
        handleSubmitOpenNotif();
      }
    } else {
      setMessageNotif(`Vous avez annulé la suppression de l'utilisateur.`);
      setSeverityNotif("info");
      handleSubmitOpenNotif();
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };

    try {
      const res = await axiosInstance.put(
        `/api/admin/users/update/${updatedRow.id}`,
        updatedRow
      );

      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      console.log("res handleSaveClick: ", res);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
      setUsers(res.data.allUsers);
      return updatedRow;
    } catch (error) {
      console.log("error: ", error);
      if (error?.response) {
        setMessageNotif(error.response.data.message);
      } else if (error?.message) {
        setMessageNotif(error?.message);
      } else {
        setMessageNotif(
          "Une erreur s'est produite. Veuillez reessayer plutard."
        );
      }
      setSeverityNotif("error");
      handleSubmitOpenNotif();
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 55 },
    {
      field: "firstname",
      headerName: "First name",
      width: 100,
      editable: true,
    },
    {
      field: "lastname",
      headerName: "Last name",
      width: 100,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 80,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "university",
      headerName: "University",
      width: 100,
      editable: true,
    },
    {
      field: "univ_abrev",
      headerName: "Univ-abbre",
      width: 100,
    },
    {
      field: "updatedAt",
      headerName: "UpdatedAt",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 150,
    },
    {
      field: "isDeleted",
      headerName: "Deleted",
      width: 60,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={"save"}
              icon={<Save />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={"cancel"}
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<Delete />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [updateDataLoading, setUpdateDataLoading] = useState(false);

  const handleClickUpdateData = async () => {
    setUpdateDataLoading(true);
    try {
      const usersUpdated = await getAllUsers();

      setUsers(usersUpdated.allUsers);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setUpdateDataLoading(false);
    }
  };

  const dataLoading = !users.length > 0 || !university.length > 0;

  return (
    <div className="users-page">
      {dataLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircularProgress size={100} />
        </div>
      )}
      {users.length > 0 && (
        <Box sx={{ height: 600, width: "100%" }}>
          <CustomizedSnackbars
            open={openNotif}
            message={messageNotif}
            setOpen={setOpenNotif}
            severity={severityNotif}
          />
          <Button color="primary" startIcon={<Add />} onClick={handleClickOpen}>
            Add user
          </Button>
          <Button
            onClick={handleClickUpdateData}
            color="secondary"
            startIcon={
              <Replay className={updateDataLoading ? "rotate-icon" : ""} />
            }
          >
            Actualiser
          </Button>
          <CreateNewUser open={open} handleClose={handleClose} />
          <StyledDataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 25,
                },
              },
              sorting: {
                sortModel: [{ field: "id", sort: "asc" }],
              },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error) =>
              console.log("error onProcessRowUpdateError: ", error)
            }
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            slots={{
              toolbar: CustomToolbar,
            }}
            getRowClassName={(params) =>
              `super-app-theme--${params.row.isDeleted}-${params.row.role}`
            }
          />
        </Box>
      )}
    </div>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
