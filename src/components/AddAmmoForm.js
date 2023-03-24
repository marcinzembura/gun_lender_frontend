import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Utils from './utils/Utils';
import AmmoService from '../services/AmmoService';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        To pole jest wymagane!
      </div>
    );
  }
};

export default function AddAmmoForm() {
  const messages = {
    addSuccess: 'Dodano amunicję',
    addFail: 'Wystąpił błąd, nie dodano amunicji',
    systemError: 'Wystąpił błąd, skontatkuj sie z supportem'
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const ammo = {
      caliber: data.get('caliber'),
      amount: data.get('amount'),
      price: data.get('price'),
      picture: data.get('picture'),
    }
    console.log(ammo);
    await AmmoService.addAmmo(JSON.stringify(ammo)).then(() => {
      Utils.showSuccessToast(messages.addSuccess);
      Utils.refreshPage();
    }).catch((error) => {
      if (error.response.status === 400) {
        Utils.showWarningToast(messages.addFail);
      } else if (error.response.status === 500) {
        Utils.showErrorToast(messages.systemError)
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 'mobileStepper'
        }}
      >
        <Typography component="h1" variant="h5">
          Dodawanie amunicji
        </Typography>
        <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                id="caliber"
                label="Kaliber"
                name="caliber"
                validations={[required]}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                id="amount"
                label="Ilość"
                name="amount"
                validations={[required]}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                name="price"
                label="Cena"
                id="price"
                validations={[required]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="picture"
                label="Zdjęcie"
                id="picture"
                validations={[required]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Dodaj amunicję
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

