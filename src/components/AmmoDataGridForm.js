import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import AmmoService from '../services/AmmoService';
import Utils from './utils/Utils';

const messages = {
  deleteSuccess: 'Usunieto',
  deleteFail: 'Nie usunieto',
  editSuccess: 'Edycja poprawna',
  editFail: 'Edycja niepoprawna',
  systemError: 'Wystąpił błąd, skontatkuj sie z supportem'
}

const columns = [
  { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', maxWidth: 60, flex: 1 },
  { field: 'caliber', headerName: 'Kaliber', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'amount', headerName: 'Ilość', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'price', headerName: 'Cena', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'picture', headerName: 'Zdjęcie', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
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
            const ammoId = params.row.id;
            delete row.id;
            console.log(row);
            AmmoService.editAmmo(ammoId, JSON.stringify(row)).then(() => {
              Utils.showSuccessToast(messages.editSuccess);
              Utils.refreshPage();
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
            const ammoId = params.row.id;
            AmmoService.deleteAmmo(ammoId).then(() => {
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



export default function AmmoDataGridForm() {
  const [ammoArray, setAmmo] = useState([]);

  useEffect(() => {
    AmmoService.getAmmo()
      .then((result) => {
        setAmmo(result.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  return (

    <Box sx={{ marginLeft: 30, marginTop: 20, zIndex: 'mobileStepper' }}>
      <Typography variant="h6" component="h2">WYŚWIETLENIE, EDYCJA ORAZ EDYCJA AMUNICJI </Typography>
      <Box sx={{ height: 500, width: '80%', alignItems: 'center', }}>
        <DataGrid
          rows={ammoArray}
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

