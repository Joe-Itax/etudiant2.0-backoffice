import { Box, Button, CircularProgress } from "@mui/material";
import { Add, Cancel, Delete, Edit, Save } from "@mui/icons-material";
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
import CreateNewUniversity from "../components/create-university/create-university";
import CustomizedSnackbars from "../components/feedback/notif";
import {
  getAllUsers,
  getAllUniversities,
} from "../components/get-datas/get-data";

import "./style.css";

export default function Universities() {
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

  const initialRows = university.map((univ) => {
    return {
      id: univ.id,
      title: univ.title,
      abbreviation: univ.abbreviation,
      city: univ.city,
      createdAt: `${univ.createdAt.slice(0, 10)}  ${univ.createdAt.slice(
        10,
        16
      )}`,
      updatedAt: `${univ.updatedAt.slice(0, 10)}  ${univ.updatedAt.slice(
        10,
        16
      )}`,
    };
  });

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  //UseEffetc pour ecouter les changes sur les universites
  useEffect(() => {
    setRows(
      university.map((univ) => {
        return {
          id: univ.id,
          title: univ.title,
          abbreviation: univ.abbreviation,
          city: univ.city,
          createdAt: `${univ.createdAt.slice(0, 10)}  ${univ.createdAt.slice(
            10,
            16
          )}`,
          updatedAt: `${univ.updatedAt.slice(0, 10)}  ${univ.updatedAt.slice(
            10,
            16
          )}`,
        };
      })
    );
  }, [university]);

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
      confirm(`Etes vous sur de vouloir supprimer cet Université ? \nInfos de l'université: \n
    Nom: ${rows.find((row) => row.id === id).title} \n
    Abbre: ${rows.find((row) => row.id === id).abbreviation} \n
    City: ${rows.find((row) => row.id === id).city}`)
    ) {
      try {
        const res = await axiosInstance.delete(`/api/admin/universities/${id}`);

        // console.log("res handleDeleteClick: ", res);
        setRows(rows.filter((row) => row.id !== id));
        setMessageNotif(res.data.message);
        setSeverityNotif("success");
        handleSubmitOpenNotif();
        setUniversity(res.data.allUniversities);
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
      setMessageNotif(`Vous avez annulé la suppression de l'université.`);
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
        `/api/admin/universities/${updatedRow.id}`,
        updatedRow
      );

      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      console.log("res handleSaveClick: ", res);
      setMessageNotif(res.data.message);
      setSeverityNotif("success");
      handleSubmitOpenNotif();
      setUniversity(res.data.allUniversities);
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

  // console.log("universities: ", university);
  const columns = [
    { field: "id", headerName: "ID", width: 55 },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      editable: true,
    },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      width: 105,
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      width: 80,
      editable: true,
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

  const dataLoading = !university.length > 0;

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
          <Button
            color="primary"
            startIcon={<Add />}
            onClick={handleClickOpen}
            variant="contained"
            sx={{ mb: 2 }}
          >
            Add university
          </Button>
          <CreateNewUniversity open={open} handleClose={handleClose} />
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
