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

export const AddressDetails = () => {


  return (
    <Card>
        <CardHeader
          
          title="Address Details"
        />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="User ID *" value="5" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Address *" value="67867,Vijay Nagar" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="House No.* " value="09809" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="City *" value="Indore" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Full Name *" value="John Doe" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Phone Number *" value="1234567890" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="State *" value="Mp" fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Pin Code *" value="13213" fullWidth disabled />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
