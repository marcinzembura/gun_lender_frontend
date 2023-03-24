import React from 'react';
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
import UserService from '../../services/UserService';
import Utils from '../utils/Utils'

export default function EditAccount({ userArray }) {
  const navigate = useNavigate();
  const messages = {
    editSuccess: 'Zmieniono dane',
    editFail: 'Wystąpił błąd',
    systemError: 'Wystąpił błąd, skontatkuj sie z supportem'
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phoneNumber: data.get('phoneNumber'),
    }

    await UserService.editUser(userArray.id, JSON.stringify(user))
      .then((result) => {
        Utils.showSuccessToast(messages.editSuccess);
        if(userArray.accountType ==='ADMINISTRATOR') {
          navigate('/admin/ustawienia');
        } else {
          navigate('/klient/ustawienia');
        }
      }).catch((error) => {
        if (error.response.status === 400) {
          Utils.showWarningToast(messages.editFail);
        } else if (error.response.status === 500) {
          Utils.showErrorToast(messages.systemError)
        }
      });
  };

  if (userArray.length === 0) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Ładuje strone...
    </div>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Edycja danych {userArray.firstName}
        </Typography>
        <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Imię"
                autoFocus
                defaultValue={userArray.firstName}
              />
              {console.log(userArray)}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Nazwisko"
                name="lastName"
                defaultValue={userArray.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Adres email"
                name="email"
                defaultValue={userArray.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Numer telefonu"
                name="phoneNumber"
                defaultValue={userArray.phoneNumber}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Edytuj dane
          </Button>
        </Box>
      </Box>
    </Container>
  );
}