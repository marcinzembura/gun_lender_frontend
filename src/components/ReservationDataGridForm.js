import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import LendingService from '../services/LendingService';
import Utils from './utils/Utils';


const columns = [
  { field: 'userId', headerName: 'ID użytkownika', headerAlign: 'center', align: 'center',  flex: 1 },
  { field: 'gunId', headerName: 'ID broni', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'ammoId', headerName: 'ID amunicji', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'ammoAmount', headerName: 'Ilość amunicji', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'reservationDate', headerName: 'Data rezerwacji', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
  { field: 'totalPrice', headerName: 'Cena całkowita', editable: true, headerAlign: 'center', align: 'center', flex: 1 },
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
             Utils.showSuccessToast('Blad przy usuwaniu rezerwacji');
          }}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box >
      );
    }
  }
]



export default function ReservationDataGridForm() {

  const [reservationArray, setReservations] = useState([]);
  const [hasAccess, setHasAccess] = useState(undefined);

  useEffect(() => {
      LendingService.getLending()
          .then((result) => {
              console.log(result.data);
              let id = 0;
              let reservationArrayWithIds = [];
              result.data.forEach((lending) => {
                  lending.id = id++;
                  console.log(lending);
                  reservationArrayWithIds.push(lending);
              });
              setReservations(reservationArrayWithIds);
          }).catch((error) => {
              console.log(error);
          });
      setHasAccess(true);
  }, [])

  if (hasAccess === undefined) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          Ładuje strone...
      </div>;
  }
  console.log(reservationArray);

  return (

    <Box sx={{ marginLeft: 30, marginTop: 30, zIndex: 'mobileStepper' }}>
      <Typography variant="h6" component="h2">WYŚWIETLENIE, EDYCJA ORAZ USUWANIE REZERWACJI </Typography>
      <Box sx={{ height: 500, width: '70%', alignItems: 'center', }}>
        <DataGrid
          rows={reservationArray}
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

