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
import UserService from '../../services/UserService';
import axios from 'axios';
import Utils from '../utils/Utils'

export default function ChangePassword() {
  const navigate = useNavigate();
  const messages = {
    loginSuccess: 'Hasło zostało zmienione',
    loginFail: 'Wystąpił błąd',
    systemError: 'Wystąpił błąd, skontatkuj sie z supportem'
  }

  const [userArray, setUser] = useState([]);

  useEffect(() => {
    UserService.getCurrentUserData()
      .then((result) => {
        setUser(result.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: userArray.email,
      password: data.get('oldpassword'),
    }
    await UserService.loginUser(JSON.stringify(user))
      .then((result) => {
        const password = {
          password: data.get('newpassword'),
        }
        UserService.updatePassword(
          userArray.id,
          JSON.stringify(password))
          .then((result) => {
            Utils.showSuccessToast(messages.loginSuccess);
            window.location.reload(false);
          }).catch((error) => {
            if (error.response.status === 400) {
              Utils.showWarningToast(messages.loginFail);
            } else if (error.response.status === 500) {
              Utils.showErrorToast(messages.systemError)
            }
          })
      }).catch((error) => {
        if (error.response.status === 400) {
          Utils.showWarningToast(messages.loginFail);
        } else if (error.response.status === 500) {
          Utils.showErrorToast(messages.systemError)
        }
      })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 7
        }}
      >
        <Typography component="h1" variant="h5">
          Zmiana hasła
        </Typography>
        <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="oldpassword"
            label="Stare hasło"
            type="password"
            id="oldpassword"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newpassword"
            label="Nowe hasło"
            type="password"
            id="newpassword"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zmień hasło
          </Button>
        </Box>
      </Box>
    </Container>
  );
}