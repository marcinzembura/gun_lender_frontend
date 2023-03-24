import React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { Card } from '@mui/material';
import ChangePassword from './ChangePassword';
import EditAccount from './EditAccount';
import UserService from '../../services/UserService';
import Utils from '../utils/Utils';

export default function SettingsUserForm() {
    const navigate = useNavigate();
    const [userArray, setUser] = useState([]);

    useEffect(() => {
        UserService.getCurrentUserData()
            .then((result) => {
                setUser(result.data);
            }).catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{ m: 3 }} variant="contained" color="error"
                    onClick={() => {
                        UserService.deleteUser(userArray.id)
                            .then((result) => {
                                Utils.showSuccessToast('Usunięto konto');
                                navigate('/');
                            }).catch((error) => {
                                console.log(error);
                                Utils.showErrorToast('Wystąpił błąd');
                            });
                    }}>
                    Usuń konto
                </Button>
            </Box>
            <Box
                component="polygon"
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-evenly',
                }}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <ChangePassword />
                </Card>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <EditAccount userArray={userArray} />
                </Card>
            </Box></>
    );
}