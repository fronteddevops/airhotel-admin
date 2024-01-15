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
} from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const Page = (props) => {
  const router = useRouter()
  const { id } = router.query;

  return (
    <form
      autoComplete="off"
      noValidate
      // onSubmit={handleSubmit}
    >
      <Card sx={{ mt: 9 }}>
        <Typography variant="h5" sx={{ ml: 2.5 }}>
          View Booking Details
        </Typography>
        <CardContent sx={{ pt: 0, mt: 4 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="User Name"
                  name="userName"
                  // onChange={handleChange}
                  required
                  value="John"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Check In Date"
                  name="checkInDate"
                  // onChange={handleChange}
                  required
                  value="Doe"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Adult"
                  name="adult"
                  // onChange={handleChange}
                  required
                  value="1"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Children"
                  name="children"
                  // onChange={handleChange}
                  required
                  value="0"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  // onChange={handleChange}
                  required
                  value="100"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Total Price"
                  name="totalPrice"
                  // onChange={handleChange}
                  required
                  value="1500"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Total Room"
                  name="totalRoom"
                  // onChange={handleChange}
                  required
                  value="1"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address Id"
                  name="addressId"
                  // onChange={handleChange}
                  required
                   value="rstuvw"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Booking Id"
                  name="bookingId"
                  // onChange={handleChange}
                  required
                   value="2"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  // onChange={handleChange}
                  required
                  value="Confirmed"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
     
        {/* <CardActions sx={{ justifyContent: "flex-end", m: 2 }}>
            <Button variant="contained" sx={{ p: 1.5 }} onClick={handleBack}>
              Back
            </Button>
          </CardActions> */}
      </Card>
    </form>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
