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

export const BookingDetails = () => {


  return (
    <Card>
         <CardHeader
          
          title="Booking Details"
        />
      <CardContent>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="ID *" value="1" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="User Name *" value="John Doe" fullWidth disabled />
          </Grid>
           <Grid item xs={12} sm={6}>
            <TextField label="Booking ID *" value="223" fullWidth disabled />
          </Grid>
         
           <Grid item xs={12} sm={6}>
            <TextField label="Rooms ID *" value="253" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Payment Type *" value="Online" fullWidth disabled />
          </Grid>
          

          <Grid item xs={12} sm={6}>
            <TextField label="Amount * " value="20000" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Status *" value="Pending" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Rooms Quantity *" value="3221" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Check In Date *" value="5/01/2024" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Check Out Date *" value="15/01/2024" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Rooms Type *" value="Single" fullWidth disabled />
          </Grid>

         
        </Grid>
      </CardContent>
    </Card>
  );
};
