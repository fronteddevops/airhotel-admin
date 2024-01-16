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

export const UserDetails = () => {


  return (
    <Card>
         <CardHeader
          
          title="User Details"
        />
      <CardContent>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <TextField label="ID *" value="3" fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="User Name *" value="John Doe" fullWidth disabled />
          </Grid>

        

          <Grid item xs={12} sm={6}>
            <TextField label="Phone Number * " value="1234567890" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Email Address *" value="john@gmail.com" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Date of Birth *" value="4/01/2007" fullWidth disabled />
          </Grid>

         
        </Grid>
      </CardContent>
    </Card>
  );
};
