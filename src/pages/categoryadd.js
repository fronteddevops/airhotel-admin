/* eslint-disable react/jsx-max-props-per-line */
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  TextField,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
  IconButton,
  CardActions,
  Divider,
  CardHeader,
  CardContent,
  Card,
  Avatar,
  InputLabel,
  Input,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  //
  // const [categoryImage, setCategoryImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedValue, setSelectedValue] = useState("first");
  const [categoryImageResponse, setCategoryNameImageResponse] = useState("");
  const [AddCateGoryError, setAddCateGoryError] = useState("");
  const [categoryImage, setCategoryNameImage] = useState("");
  const handleFileUploadIcon = (event) => {
    const selectedFile = event.target.files[0];
    setCategoryIcon(selectedFile);
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
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const uploadCategoryImage = async () => {
    if (categoryImage) {
      const formData = new FormData();
      formData.append("image", categoryImage);

      try {
        const response = await services.category.UPLOAD_IMAGE(formData);
        if (response) {
          setCategoryNameImageResponse(response?.data?.pic);
          setCategoryNameImage("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };
  const handleRemoveImage = () => {
    setCategoryImage(null);
  };
  const AddCateGory = () => {
    let Error = true;
    if (categoryName == "") {
      Error = false;
      setAddCateGoryError("Please enter a category name");
    }
  };
  return (
    <>
      <form
        autoComplete="off"
        noValidate
        // onSubmit={handleSubmit}
      >
        <Card sx={{ mt: 9 }}>
          <Typography variant="h5" sx={{ ml: 2.5 }}>
            Add Category
          </Typography>

          <CardContent sx={{ pt: 0, mt: 5 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={2}>
                <div style={{ position: "fixed", right: "27.9rem", top: "4.3rem" }}>
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
              <Grid container spacing={6}>
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
                </Grid>
              </Grid>
              <FormControl component="fieldset" style={{ marginLeft: "20px" }}>
                <RadioGroup
                  row
                  name="use-radio-group"
                  value={selectedValue}
                  onChange={handleRadioChange}
                >
                  <span style={{ paddingTop: "8px" }}>Status :</span>
                  <span style={{ marginLeft: "20px" }}>
                    <FormControlLabel value="first" control={<Radio />} label="Active" />
                    <FormControlLabel value="second" control={<Radio />} label="InActive" />
                  </span>
                </RadioGroup>
              </FormControl>
            </Box>
          </CardContent>

          <CardActions sx={{ ml: 1 }}>
            <Button variant="contained" sx={{ p: 1.5 }}>
              Save Details
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
