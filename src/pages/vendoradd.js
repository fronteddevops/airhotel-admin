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
      // <>
      //   <Box
      //     component="main"
      //     sx={{
      //       flexGrow: 1,
      //       py: 8,
      //     }}
      //   >
      //     <Container maxWidth="lg">
      //       <Stack spacing={3}>
      //         <div>
      //           <Typography variant="h4">Add Vendor</Typography>
      //         </div>
      //         <Grid container spacing={3}>
      //           <Grid item xs={12} md={12} lg={12}>
      //             <Grid>
      //             <TextField
      //       label="Vendor Name"
      //       value={newVendor.name}
      //       onChange={(e) => handleInputChange("name", e.target.value)}
      //       fullWidth
      //     />
      //     <TextField
      //       label="Email"
      //       value={newVendor.email}
      //       onChange={(e) => handleInputChange("email", e.target.value)}
      //       fullWidth
      //     />
      //     <TextField
      //       label="City"
      //       value={newVendor.address.city}
      //       onChange={(e) => handleInputChange("address", { city: e.target.value })}
      //       fullWidth
      //     />
      //     <TextField
      //       label="Phone"
      //       value={newVendor.phone}
      //       onChange={(e) => handleInputChange("phone", e.target.value)}
      //       fullWidth
      //     />
      //     <TextField
      //       label="Website"
      //       value={newVendor.website}
      //       onChange={(e) => handleInputChange("website", e.target.value)}
      //       fullWidth
      //     />
      //               {/* {AddCateGoryError && <span style={{ color: "red" }}>{AddCateGoryError}</span>} */}
      //             </Grid>
                  
                 
                  
      //             <div style={{ marginTop: '20px' }}>
      //               <Button
      //                 variant="contained"
      //                 sx={{ width: "200px", height: "50px" }}
      //                 // onClick={handleAddVendor}
      //               >
      //                 Submit
      //               </Button>
      //             </div>
      //           </Grid>
      //         </Grid>
      //       </Stack>
      //     </Container>
      //   </Box>
      // </>
      <form

      autoComplete="off"
      noValidate
      // onSubmit={handleSubmit}
    >
      <Card sx={{ pt: 10 }}>
        <CardHeader
          // subheader="The information can be edited"
          title="Add Vendor"
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
                 
                  label="Vendor Name"
                  name="vendorName"
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