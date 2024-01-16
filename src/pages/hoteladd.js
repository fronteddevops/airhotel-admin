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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const Page = (props) => {

  const [age, setAge] = React.useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [categoryImageResponse, setCategoryNameImageResponse] = useState("");

  const [categoryImage, setCategoryNameImage] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  //  handle category  image
  const handleImageUploadCategory = (e) => {
    setIsDisabled(true);
    setCategoryNameImageResponse("");
    const file = e.target.files[0];
    if (file) {
      setCategoryNameImage(file);
    } else {
    }
  };

  const uploadCategoryImage = async () => {
   
      setCategoryNameImage("");
      // if (categoryImage) {
      //   const formData = new FormData();
      //   formData.append("image", categoryImage);
  
      //   try {
      //     const response = await services.category.UPLOAD_IMAGE(formData);
      //     if (response) {
  
      //       setCategoryNameImageResponse(response?.data?.pic);
      //       setCategoryNameImage("");
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // } else {
      // }
    
  };
  return (
 
    <Box sx={{width: '100%', typography: 'body1' ,p:5}}>
       <Card sx={{ mt: 5 ,pt:2,pb:2}}>
        <Typography variant="h5" sx={{ ml: 2.5 }}>
          Add Hotel
        </Typography>
        <CardContent sx={{ pt: 0, mt: 4 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <FormControl fullWidth variant="filled" >
                  <InputLabel id="demo-simple-select-filled-label">Select Category *</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={age}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Category One</MenuItem>
                    <MenuItem value={20}>Category Second</MenuItem>
                    <MenuItem value={30}>Category Third</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Hotel Name" name="hotelName" required />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Email" name="email" required />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Hotel Address" name="hotelAddress" required />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Phone Number" name="phone" type="number" />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="City" name="city" required />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="State/Province" name="stateProvince" required />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Country" name="Country" required />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Zip Code" name="zipCode" required />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Phone Number" name="phone" type="number" />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField fullWidth label="Website" name="website" required />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Amenities" name="amenities" required />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField fullWidth label="Per night Price *" name="perNightPrice" type="number" />
              </Grid>
              <Grid xs={12} md={6}>
                  <div>
                    <FormControl fullWidth>
                      {/* <InputLabel htmlFor="categoryImageInput">Category Image</InputLabel> */}
                      <TextField
                        type="file"
                        accept="image/*"
                        id="categoryImageInput"
                        onChange={handleImageUploadCategory}
                      />
                    </FormControl>
                    <br />
                  </div>
                  <div >
                  {categoryImage && (
                    <Avatar
                      src={URL.createObjectURL(categoryImage)}
                      alt={`UploadedImage`}
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "0",
                      }}
                    />
                  )}

                  {categoryImage && (
                    <Button
                      style={{
                        width: "6.4rem",
                        margin: 0,
                        padding: 0,
                        borderRadius: 0,
                      }}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={uploadCategoryImage}
                    >
                      Upload
                    </Button>
                  )}
                </div>
                </Grid>
                
            </Grid>

          
    
          </Box>
          
        </CardContent>
        <Divider/>
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
