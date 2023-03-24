import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import AmmoService from '../services/AmmoService';

export default function AllAmmoCard() {

  const [ammoArray, setAmmo] = useState([]);

  useEffect(() => {
    AmmoService.getAmmo()
      .then((result) => {
        setAmmo(result.data);
        console.log(result.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <Box sx={{ marginTop: 15, marginLeft: 30, width: '70%' }}>
      <Grid
        container
        direction="row"
        spacing={{ xs: 7, md: 7 }}
        columns={{ xs: 4, sm: 20, md: 12 }}
      >
        {ammoArray.map((ammo) => (
          <Card sx={{ m: 2, maxWidth: 240 }}>
            <CardMedia
              component="img"
              image={ammo.picture}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {ammo.caliber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CENA: {ammo.price} 
                </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}

