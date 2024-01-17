/* eslint-disable react/jsx-max-props-per-line */
import { AddBox } from "@mui/icons-material";
import {

  Typography,
  Unstable_Grid2 as Grid,
  TextField,
  Button,
  FormControl,
  CardActions,
  Divider,
  CardContent,
  Card,
  Avatar,
  CardHeader,
  Box,
} from "@mui/material";
import { useState } from "react";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [categoryImageResponse, setCategoryNameImageResponse] = useState("");

  const [categoryImage, setCategoryNameImage] = useState("");

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
        <Card sx={{ mt: 5,pt:2,pb:2}}>
    <CardHeader
      
      title="Add Category"
    />
  <CardContent>
    <Grid container spacing={2}>
    <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    //   helperText="Please specify the Hotel name"
                    label="Category Name"
                    name="categoryName"
                    // onChange={handleChange}
                    required
                    // value={values.firstName}
                  />
                </Grid>
    <Grid xs={12} lg={6} md={6}>
                  <div style={{ position: 'relative' }}>
                    <FormControl fullWidth>
                      {/* <InputLabel htmlFor="categoryImageInput">Category Image</InputLabel> */}
                      <TextField
                        type="file"
                        accept="image/*"
                        id="categoryImageInput"
                        onChange={handleImageUploadCategory}
                      />
                      <div style={{ position: 'absolute', bottom: '3.6rem' }}>
                       
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
                              width: "6.2rem",
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
                    </FormControl>
                    <br />
                  </div>
                </Grid>

   

   

    </Grid>
    <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button variant="contained">Save Details</Button>
          </CardActions>
  </CardContent>
  
</Card>
  </Box>

  )
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
