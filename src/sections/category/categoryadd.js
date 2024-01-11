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
  } from "@mui/material";
  import { useState } from "react";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
  const Page = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryIcon, setCategoryIcon] = useState(null);
    const [categoryImage, setCategoryImage] = useState(null);
    const [selectedValue, setSelectedValue] = useState("first");
    const [AddCateGoryError, setAddCateGoryError] = useState("");
    const handleFileUploadIcon = (event) => {
      const selectedFile = event.target.files[0];
      setCategoryIcon(selectedFile);
    };
    const handleFileUploadImage = (event) => {
      const selectedFile = event.target.files[0];
      setCategoryImage(selectedFile);
    };
    const handleRadioChange = (event) => {
      setSelectedValue(event.target.value);
    };
    const handleRemoveIcon = () => {
      setCategoryIcon(null);
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
      const newCategory = {
        categoryName,
        categoryImage
      };
      onAddCategory(newCategory);
      setCategoryName('');
    };
    return (
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <div>
                <Typography variant="h4">Add Category</Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12} md={5} lg={5}>
                  <Grid>
                    <TextField
                      label="Category Name"
                      variant="outlined"
                      fullWidth
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value.trimStart());
                        setAddCateGoryError("");
                      }}
                      sx={{ marginBottom: 0 }}
                    />
                    {AddCateGoryError && <span style={{ color: "red" }}>{AddCateGoryError}</span>}
                  </Grid>
                  <div style={{ position: "relative", display: "inline-block" , marginTop: "50px"  }}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="icon-file-input"
                      multiple
                      type="file"
                      onChange={handleFileUploadIcon}
                    />
                    <label htmlFor="icon-file-input" sx={{ marginBottom: 2 }}>
                      <Button variant="contained" component="span">
                        Category Icon
                      </Button>
                    </label>
                    {categoryIcon && (
                      <div style={{ position: "relative" }}>
                        <img
                          src={URL.createObjectURL(categoryIcon)}
                          alt="Selected Icon"
                          style={{ height: "120px", width: "300px", marginTop: "10px" }}
                        />
                        <IconButton onClick={handleRemoveIcon} sx={{ top: -100, right: 10 }}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-file-input"
                      multiple
                      type="file"
                      onChange={handleFileUploadImage}
                    />
                    <label htmlFor="image-file-input" sx={{ marginBottom: 2 }}>
                      <Button variant="contained" component="span">
                        Category Slider Image
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
                  <div>
                    <FormControl component="fieldset" style={{ marginTop: "20px" }}>
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
                  </div>
                  <div style={{ display: "flex", justifyContent: "right", marginTop: "40px" }}>
                    <Button
                      variant="contained"
                      sx={{ width: "200px", height: "50px" }}
                      onClick={AddCateGory}
                    >
                      Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Stack>
          </Container>
        </Box>
      </>
    );
  };
  Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  export default Page;