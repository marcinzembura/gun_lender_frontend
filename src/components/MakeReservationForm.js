import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import GunService from '../services/GunService';
import LendingService from '../services/LendingService';
import AmmoService from '../services/AmmoService';
import UserService from '../services/UserService';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Utils from './utils/Utils'


export default function MakeReservationForm() {
  const navigate = useNavigate();
  const messages = {
    addSuccess: 'Dodano Rezerwacje',
    addFail: 'Broń nie jest dostępna w tym terminie',
    systemError: 'Wystąpił błąd, skontatkuj sie z supportem'
  }
  const [gun, setGun] = useState(null);
  const [gunAmmo, setGunAmmo] = useState(null);
  const [userArray, setUser] = useState([]);
  const [hasAccess, setHasAccess] = useState(undefined);
  const [value, setValue] = React.useState(dayjs(new Date()));
  const { id } = useParams();
  const [ammoAmount, setAmmoAmount] = useState(null);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [reservationDate, setReservationDate] = useState(dayjs(new Date()));
  const [ammoId, setAmmoId] = useState(null);
  const [ammoCaliber, setAmmoCaliber] = useState('');

  useEffect(async () => {
    await GunService.getGun(id)
      .then((result) => {
        setGun(result.data);
      }).catch((error) => {
      });
    await AmmoService.getAmmo()
      .then((result) => {
        setGunAmmo(result.data);
      }).catch((error) => {
        if (error.response.status === 400) {
        } else if (error.response.status === 500) {
          Utils.showErrorToast(messages.systemError)
        }
      });
    await UserService.getCurrentUserData()
      .then((result) => {
        setUser(result.data);
      }).catch((error) => {
        console.log(error);
      });
    setHasAccess(true);
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const lending = {
      userId: userArray.id,
      gunId: gun.id,
      ammoId: ammoId,
      ammoAmount: ammoAmount,
      reservationDate: reservationDate,
    }
    await LendingService.addLending(lending)
      .then(() => {
        navigate('/klient/zamowienia');
        window.location.reload(false);
        Utils.showSuccessToast(messages.addSuccess);
      }).catch((error) => {
        if (error.response.status === 400) {
          Utils.showWarningToast(messages.addFail);
        } else if (error.response.status === 500) {
          Utils.showErrorToast(messages.systemError)
        }
      });
  };

  const handleAmmoAmountChange = (event) => {
    setAmmoAmount(event.target.value);
  };

  const handleAmmoChange = (event) => {
    setAmmoId(event.target.value.id);
    setAmmoCaliber(event.target.value.caliber);
  };

  if (hasAccess === undefined) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Ładuje strone...
    </div>;
  }

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
      ><Card sx={{ m: 2, maxWidth: 240 }}>
          <Card sx={{ m: 2, maxWidth: 240 }}>
            <CardMedia
              component="img"
              image={gun.picture}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {gun.model}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CENA: {gun.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ILOSC WOLNYCH SZTUK: {gun.amount}
              </Typography>
            </CardContent>
          </Card>
        </Card>
        <Typography component="h1" variant="h5">
          Wybierz date oraz amunicje
        </Typography>
        <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Dzień rezerwacji"
                  value={reservationDate}
                  required
                  onChange={(value) => {
                    setReservationDate(new Date(value.$y, value.$M, value.$D, value.$H));
                  }}
                />
              </LocalizationProvider>
            <InputLabel id="demo-simple-select-label">Rodzaj Amunicji</InputLabel>
            <FormControl fullWidth>
              <Select
                labelId="ammo"
                id="ammo"
                value={ammoCaliber}
                label="Amunicja"
                required
                onChange={handleAmmoChange}
              >
                {gunAmmo?.map((ammo) => (
                  <MenuItem value={ammo}>{ammo.caliber}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <InputLabel id="demo-simple-select-label">Ilość amunicji</InputLabel>
            <FormControl fullWidth>
              <Select
                labelId="ammoAmount"
                id="ammoAmount"
                value={ammoAmount}
                label="Ilość amunicji"
                required
                onChange={handleAmmoAmountChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>50</MenuItem>
                <MenuItem value={300}>300</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Dodaj rezerwacje
          </Button>
        </Box>
      </Box>
    </Container>

  );
}


