import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import UserService from '../services/UserService';
import Utils from './utils/Utils';

export default function SignUpForm() {
  const navigate = useNavigate();
  const messages = {
    registerSuccess: 'Konto zostało stworzone',
    registerFail: 'Taki adres email już istnieje, lub nie wszystkie dane są uzupełnione',
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
      password: data.get('password'),
    }
    console.log(user);
    await UserService.registerUser(JSON.stringify(user)).then(() => {
      Utils.showSuccessToast(messages.registerSuccess);
      navigate("/logowanie");
    }).catch((error) => {
      if (error.response.status === 400) {
        Utils.showWarningToast(messages.registerFail);
      } else if (error.response.status === 500) {
        Utils.showErrorToast(messages.systemError)
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Rejestracja klienta
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Nazwisko"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Adres email"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Numer telefonu"
                name="phoneNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Utwórz konto
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

