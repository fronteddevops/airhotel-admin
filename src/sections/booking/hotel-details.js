/* eslint-disable react/jsx-max-props-per-line */
import { useCallback } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  InputLabel,
  Box,
  TextField,
} from "@mui/material";

export const HotelDetails = () => {


  return (
    <Card>
         <CardHeader
          
          title="Hotel Details"
        />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="ID *" value="1" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Hotel Name *" value="Sidhant Hotel" fullWidth disabled />
          </Grid>
           <Grid item xs={12} sm={6}>
            <TextField label="Images *" value="" fullWidth disabled />
          </Grid>
         
           <Grid item xs={12} sm={6}>
            <TextField label="Address *" value="Arvindo Indore MP" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="City *" value="Indore" fullWidth disabled />
          </Grid>
          

          <Grid item xs={12} sm={6}>
            <TextField label="State/Proince * " value="MP" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Country *" value="India" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Zip Code *" value="3221" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone Number *" value="32132132132" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email *" value="john@gmail.com" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Website *" value="johnwww.com" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Amenities *" value="sa2" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Per Night Price *" value="54000" fullWidth disabled />
          </Grid>

         
        </Grid>
      </CardContent>
    </Card>
  );
};
