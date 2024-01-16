/* eslint-disable react/jsx-max-props-per-line */
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  TextField,
  Button,
  Divider,
  CardActions,
  CardHeader,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const Page = (props) => {
  return (
    <Box sx={{width: '100%', typography: 'body1' ,p:5}}>
       <Card sx={{ mt: 5 ,pt:2,pb:2}}>
        <Typography variant="h5" sx={{ ml: 2.5 }}>
          Edit Subscription
        </Typography>
        <CardContent sx={{ pt: 0, mt: 4 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Plan Name" name="planName" required />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField fullWidth label="Enter No. of products" name="enterProducts" required />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="State/Province" name="stateProvince" required />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Price" name="CounPricetry" type="number" required />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField fullWidth label="Category Type" name="categoryType" required />
              </Grid>
              <Grid xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker sx={{ width: "100%" }} />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button variant="contained">Save Details</Button>
        </CardActions>
      </Card>
    </Box>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
