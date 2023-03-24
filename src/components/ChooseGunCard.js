import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import GunService from '../services/GunService';

export default function ChooseGun() {
  const [gunsArray, setGuns] = useState([]);

  useEffect(() => {
    GunService.getGuns()
      .then((result) => {
        setGuns(result.data);
        console.log(result.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <div>
      <Typography align="center" component="h1" variant="h5" sx={{ marginTop: 5 }}>
        Wybierz broń
      </Typography>
      <Box sx={{ marginTop: 15, marginLeft: 30, width: '70%' }}>
        <Grid
          container
          direction="row"
          spacing={{ xs: 7, md: 7 }}
          columns={{ xs: 4, sm: 20, md: 12 }}
        >
          {gunsArray.map((gun) => (
            <Card sx={{ m: 2, maxWidth: 240 }}>
              <CardActionArea component={Link} to={`/klient/rezerwacja/bron/${gun.id}`} >
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
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Box>
    </div>

  );
}