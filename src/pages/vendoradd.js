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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const Page = (props) => {
  const { vendors, setVendors } = props;

  const [isAddVendorDialogOpen, setAddVendorDialogOpen] = useState(false);

  const [newVendor, setNewVendor] = useState({
    name: "",
    email: "",
    address: {
      city: "",
    },
    phone: "",
    website: "",
  });
  const handleAddVendor = () => {
    console.log("Adding new vendor:", newVendor);
    setVendors((prevVendors) => [...prevVendors, newVendor]);
    setNewVendor({
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      website: "",
    });
    setAddVendorDialogOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewVendor((prevVendor) => ({
      ...prevVendor,
      [field]: value,
    }));
  };

  return (
    <form
      autoComplete="off"
      noValidate
      // onSubmit={handleSubmit}
    >
      <Card sx={{ mt: 9 }}>
      <Typography variant="h5" sx={{ml:2.5}}>Add Vendor</Typography>
        <CardContent sx={{ pt: 0 ,mt:4}}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Vendor Name"
                  name="vendorName"
                  // onChange={handleChange}
                  required
                  // value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  // onChange={handleChange}
                  required
                  // value={values.lastName}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  // onChange={handleChange}
                  type="number"
                  // value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  // onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              <Grid xs={12} md={6} >
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker sx={{ width: "100%" }} />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      
        <CardActions sx={{ml:1}}>
          <Button variant="contained" sx={{ p: 1.5 }}>
            Save Details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
