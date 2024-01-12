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
  };
  return (
    <>
      <form
        autoComplete="off"
        noValidate
        // onSubmit={handleSubmit}
      >
        <Card sx={{ pt: 10 }}>
          <CardHeader
            // subheader="The information can be edited"
            title="Add Category"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
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
                  {/* <TextField
            fullWidth
            label="Category Image"
            name="categoryImage"
            // onChange={handleChange}
            required
            // value={values.lastName}
          />
          <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="icon-file-input"
                      multiple
                      type="file"
                      onChange={handleFileUploadIcon}
                    /> */}
                  <div className="col-md-4 mt-4">
                    {/* {categoryImage && (
                      <img
                        src={URL.createObjectURL(categoryImage)}
                        alt={`UploadedImage `}
                        className="uploaded-image mb-4"
                        height={100}
                        width={100}
                        style={{ borderRadius: "5px" }}
                      />
                    )} */}
                
                    {/* {categoryImage && (
                      <>
                        {" "}
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={uploadCategoryImage}
                          style={{
                            position: "absolute",
                            marginTop: "-22px",
                            marginLeft: "3px",
                            paddingLeft: "27px",
                            paddingRight: "28px",
                          }}
                        >
                          Upload
                        </button>
                      </>
                    )} */}
                 
                    {/* <TextField
                      fullWidth
                      
                      type="file"
                      
                      name="categoryName"
                     
                    />
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      className="form-control"
                      id="defaultFormControlInput"
                      placeholder="Enter Value"
                      aria-describedby="defaultFormControlHelp"
                      // onChange={handleImageUploadCategory}
                    /> */}
                  </div>
                </Grid>
                <FormControl component="fieldset"
                 style={{ marginLeft: "20px" }}
                >
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
                   
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ ml: 1.8}} >
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
