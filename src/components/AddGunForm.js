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
import GunService from '../services/GunService';


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        To pole jest wymagane!
      </div>
    );
  }
};

export default function AddGunForm() {
  const [type, setType] = React.useState('');
  const messages = {
    addSuccess: 'Dodano broń',
    addFail: 'Wystąpił błąd, nie dodano broni',
    systemError: 'Wystąpił błąd, skontatkuj sie z supportem'
  }

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const gun = {
      producer: data.get('producer'),
      model: data.get('model'),
      type: type,
      caliber: data.get('caliber'),
      weight: data.get('weight'),
      length: data.get('length'),
      amount: data.get('amount'),
      price: data.get('price'),
      picture: data.get('picture'),
    }
    console.log(gun);
    await GunService.addGun(JSON.stringify(gun)).then(() => {
      Utils.refreshPage();
      Utils.showSuccessToast(messages.addSuccess);
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
          Dodawanie broni
        </Typography>
        <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="producer"
                required
                fullWidth
                id="producer"
                label="Producent"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="model"
                label="Model"
                name="model"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Select
                  labelId="typeLabel"
                  fullWidth
                  required  
                  id="type"
                  onChange={handleChangeType}  
                >
                  <MenuItem value={"REVOLVER"}>Revolver</MenuItem>
                  <MenuItem value={"PISTOL"}>Pistol</MenuItem>
                  <MenuItem value={"SUB_MACHINE_GUN"}>Rifle</MenuItem>
                  <MenuItem value={"CARBINE"}>Carabine</MenuItem>
                  <MenuItem value={"RIFLE"}>Rifle</MenuItem>
                  <MenuItem value={"SHOTGUN"}>Shotgun</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="caliber"
                label="Kaliber broni"
                name="caliber"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="weight"
                label="Waga"
                id="weight"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="length"
                label="Długość"
                name="length"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="amount"
                label="Ilość broni"
                name="amount"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="price"
                label="Cena"
                id="price"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="picture"
                label="Zdjęcie"
                id="picture"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Dodaj broń
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

