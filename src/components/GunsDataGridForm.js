import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import GunService from '../services/GunService';
import Utils from './utils/Utils';

const messages = {
  deleteSuccess: 'Usunieto poprawnie',
  deleteFail: 'Nie usunieto',
  editSuccess: 'Edytuj poprawnie',
  editFail: 'Edycja niepoprawna',
  systemError: 'Wystąpił błąd, skontatkuj sie z supportem'
}

const columns = [
  { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', maxWidth: 60, flex: 1 },
  { field: 'producer', headerName: 'Producent', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'model', headerName: 'Model', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'type', headerName: 'Typ', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'caliber', headerName: 'Kaliber', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'weight', headerName: 'Waga', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'length', headerName: 'Długość', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'amount', headerName: 'Liczba', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
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
            const gunId = params.row.id;
            delete row.id;
            GunService.editGun(gunId, JSON.stringify(row)).then(() => {
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
            const gunId = params.row.id;
            GunService.deleteGun(gunId).then(() => {
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



export default function GunsDataGridForm() {
  const [gunsArray, setGuns] = useState([]);

  useEffect(() => {
    GunService.getGuns()
      .then((result) => {
        setGuns(result.data);
        console.log(result.data)
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  return (

    <Box sx={{ marginLeft: 30, marginTop: 30, zIndex: 'mobileStepper' }}>
      <Typography variant="h6" component="h2">WYŚWIETLENIE, EDYCJA ORAZ USUWANIE BRONI </Typography>
      <Box sx={{ height: 500, width: '70%', alignItems: 'center', }}>
        <DataGrid
          rows={gunsArray}
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

