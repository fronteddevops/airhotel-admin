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
  import { useState } from "react";
 
  import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
  const Page = (props) => {
    const { vendors, setVendors } = props;

    return (
    
      <form

      autoComplete="off"
      noValidate
      // onSubmit={handleSubmit}
    >
      <Card sx={{ pt: 10 }}>
        <CardHeader
          // subheader="The information can be edited"
          title="Add Hotel"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                //   helperText="Please specify the Hotel name"
                  label="Hotel Name"
                  name="hotelName"
                  // onChange={handleChange}
                  required
                  // value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Contact Information"
                  name="contactInformation"
                  // onChange={handleChange}
                  required
                  // value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  // onChange={handleChange}
                  required
                  // value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  // onChange={handleChange}
                  type="number"
                  // value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  // onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Other Information"
                  name="otherInformation"
                  // onChange={handleChange}
                  required
                  // value={values.email}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end',m:2 }}>
          <Button variant="contained" sx={{p: 1.5}}>
            Save Details
          </Button>
        </CardActions>
      </Card>
    </form>
    );
  };
  Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  export default Page;