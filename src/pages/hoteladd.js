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
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const Page = (props) => {
  const { vendors, setVendors } = props;
  const [categoryImage, setCategoryImage] = useState(null);
  const handleFileUploadImage = (event) => {
    const selectedFile = event.target.files[0];
    setCategoryImage(selectedFile);
  };
  const handleRemoveImage = () => {
    setCategoryImage(null);
  };
  return (
    <form autoComplete="off" noValidate>
     <Card sx={{ mt: 9 }}>
      <Typography variant="h5" sx={{ml:2.5}}>Add Hotel</Typography>
        <CardContent sx={{ pt: 0 ,mt:4}}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
            <Grid xs={12} md={6}>
            <FormControl fullWidth>
            <InputLabel>Select Category</InputLabel>
      
      <Select
        labelId="category-label"
        id="category-select"
        // value={selectedCategory}
        label="Select Category"
        // onChange={handleChange}
      >
        <MenuItem value="">Select...</MenuItem>
        <MenuItem value="category1">Category 1</MenuItem>
        <MenuItem value="category2">Category 2</MenuItem>
        <MenuItem value="category3">Category 3</MenuItem>
       
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
                <TextField fullWidth label="Per night Price" name="perNightPrice" type="number" />
              </Grid>
              <Grid xs={12} md={6}>
              <div style={{ display: "flex", flexDirection: "column", }}>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-file-input"
                    multiple
                    type="file"
                    onChange={handleFileUploadImage}
                  />
                  <label htmlFor="image-file-input" sx={{ marginBottom: 2, p: 1.5 }}>
                    <Button variant="contained" component="span">
                      Category  Image
                    </Button>
                  </label>
                  {categoryImage && (
                    <div>
                      <img
                        src={URL.createObjectURL(categoryImage)}
                        alt="Selected Image"
                        style={{ height: "120px", width: "300px", marginTop: "10px" }}
                      />
                      <IconButton onClick={handleRemoveImage} sx={{ top: -100, right: 10 }}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
              </Grid>
              
            </Grid>
          
            <CardActions sx={{ justifyContent: "flex-start",marginLeft:"-0.4rem"}}>
          <Button variant="contained" sx={{ p: 1.5,mt:2 }}>
            Save Details
          </Button>
        </CardActions>
          </Box>
         
        </CardContent>
     
        
      </Card>
    </form>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
