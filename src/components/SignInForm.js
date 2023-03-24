import React from 'react';
import { useState } from 'react';
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
import UserService from '../services/UserService';
import Utils from './utils/Utils';
import { useNavigate } from "react-router-dom";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        To pole jest wymagane!
      </div>
    );
  }
};

export default function SignInForm() {
  const navigate = useNavigate();
  const messages = {
    loginSuccess: 'Zalogowano poprawnie',
    loginFail: 'Niepoprawny email lub hasło',
    systemError: 'Wystąpił błąd, skontatkuj sie z supportem'
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    }

    await UserService.loginUser(JSON.stringify(user)).then((result) => {
      const userRole = result.headers.userrole;
      localStorage.setItem('user', result.headers.authorization);
      if (userRole === 'ADMINISTRATOR') {
        navigate("/admin/wszystkie-bronie");
      } else {
        navigate("/klient/wszystkie-bronie");
      }
      Utils.showSuccessToast(messages.loginSuccess);
    }).catch((error) => {
      if (error.response.status === 400) {
        Utils.showWarningToast(messages.loginFail);
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
          Logowanie
        </Typography>
        <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres email"
            name="email"
            autoComplete="email"
            autoFocus
            validations={[required]}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            validations={[required]}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj się
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/rejestracja" variant="body2">
                {"Nie posiadasz konta? Zarejestruj się"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}