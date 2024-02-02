/* eslint-disable react/jsx-max-props-per-line */
import {
    Box,
    Typography,
    Unstable_Grid2 as Grid,
    TextField,
    Button,
    Divider,
    CardActions,
    Card,
    CardContent,
  } from "@mui/material";
  import { useState } from "react";
  
  import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
  const Page = (props) => {
    return (
      <Box sx={{ width: "100%", typography: "body1", p: 5 }}>
        <Card sx={{ mt: 5, pt: 2, pb: 2 }}>
          <Typography variant="h5" sx={{ ml: 2.5 }}>
            Edit Coupon
          </Typography>
          <CardContent sx={{ pt: 0, mt: 4 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Generate Coupon Code"
                    name="generateCouponCode"
                    type="number"
                    required
                  />
                </Grid>
  
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Discount Percentage"
                    name="discountPercentage"
                    type="number"
                    required
                  />
                </Grid>
                <Grid xs={12} md={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                  />
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
  