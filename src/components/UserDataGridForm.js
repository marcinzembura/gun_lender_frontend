import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import UserService from '../services/UserService';
import Utils from './utils/Utils';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const messages = {
  deleteSuccess: 'Usunieto poprawnie',
  deleteFail: 'Nie usunieto',
  editSuccess: 'Edytuj poprawnie',
  editFail: 'Edycja niepoprawna',
  systemError: 'Wystąpił błąd, skontatkuj sie z supportem'
}

const columns = [
  { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', maxWidth: 60, flex: 1 },
  { field: 'firstName', headerName: 'Imię', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'lastName', headerName: 'Nazwisko', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'email', headerName: 'Email', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'phoneNumber', headerName: 'Numer telefonu', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'accountType', headerName: 'Typ konta', headerAlign: 'center', align: 'center', flex: 1 },
  {
    field: "actions",
    headerName: "",
    width: 120,
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    disableExport: true,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <IconButton onClick={() => {
            const row = params.row;
            console.log(row);
            const userId = params.row.id;
            const userRole = params.row.accountType;
            UserService.updateRole(userId,userRole)
            .then(() => {
                Utils.showSuccessToast('rola konta została zwiększona');
                Utils.refreshPage();
              }).catch((error) => {
                if (error.response.status === 400) {
                  Utils.showWarningToast(messages.editFail);
                } else if (error.response.status === 500) {
                  Utils.showErrorToast(messages.systemError)
                }
              });
          }}>
            <ArrowUpwardIcon color="success" />
          </IconButton>
          <IconButton onClick={() => {
            const row = params.row;
            console.log(row);
            const userId = params.row.id;
            delete row.id;
            delete row.passwordHash;
            delete row.accountType;
            UserService.editUser(userId, JSON.stringify(row)).then(() => {
              Utils.refreshPage();
              Utils.showSuccessToast(messages.editSuccess);
            }).catch((error) => {
              if (error.response.status === 400) {
                Utils.showWarningToast(messages.editFail);
              } else if (error.response.status === 500) {
                Utils.showErrorToast(messages.systemError)
              }
            });
          }}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => {
            const userId = params.row.id;
            UserService.deleteUser(userId).then(() => {
              Utils.refreshPage();
              Utils.showSuccessToast(messages.deleteSuccess);
            }).catch((error) => {
              if (error.response.status === 400) {
                Utils.showWarningToast(messages.deleteFail);
              } else if (error.response.status === 500) {
                Utils.showErrorToast(messages.systemError)
              }
            });
          }}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box >
      );
    }
  }
]

export default function UserDataGridForm() {
  const [userArray, setUser] = useState([]);

  useEffect(() => {
    UserService.getUser()
      .then((result) => {
        setUser(result.data);
        console.log(result.data)
      }).catch((error) => {
        console.log(error);
      });
  }, [])
  return (

    <Box sx={{ marginLeft: 30, marginTop: 30, zIndex: 'mobileStepper' }}>
      <Typography variant="h6" component="h2">WYŚWIETLENIE, EDYCJA ORAZ USUWANIE KLIENTÓW </Typography>
      <Box sx={{ height: 500, width: '70%', alignItems: 'center', }}>
        <DataGrid
          rows={userArray}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  );
}

