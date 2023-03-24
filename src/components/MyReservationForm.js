import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import LendingService from '../services/LendingService'
import Utils from '../services/Utils';

const columns = [
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'userId', headerName: 'ID użytkownika', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'gunId', headerName: 'ID broni', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'ammoId', headerName: 'ID amunicji', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'ammoAmount', headerName: 'Ilość amunicji', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'reservationDate', headerName: 'Data rezerwacji', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'totalPrice', headerName: 'Cena całkowita', headerAlign: 'center', align: 'center', flex: 1 },
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
                        const lendingId = params.row.id;
                        LendingService.deleteLending(lendingId).then(() => {
                            Utils.refreshPage();
                            Utils.showSuccessToast('usunięto rezerwacje');
                        }).catch((error) => {
                            if (error.response.status === 400) {
                                Utils.showWarningToast('błąd!');
                            } else if (error.response.status === 500) {
                                Utils.showErrorToast('błąd systemowy')
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



export default function MyReservationForm() {

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
            <Typography variant="h6" component="h2">MOJE ZAMÓWIENIA/REZERWACJE </Typography>
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