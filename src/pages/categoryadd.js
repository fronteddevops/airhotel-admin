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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { textAlign } from "@mui/system";
import { useEffect, useState } from "react";
import services from "../services";
import Toaster from "../components/toaster";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const [isDisabled, setIsDisabled] = useState(true);
  const [upload, setUpload] = useState(true);
  const [categoryImageResponse, setCategoryNameImageResponse] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [categoryImage, setCategoryNameImage] = useState("");
  const [selectedValue, setSelectedValue] = useState(true);
  const [imageResponse, setImageResponse] = useState();

  const handleImageUploadCategory = (e) => {
    setCategoryNameImageResponse("");
    const file = e.target.files[0];
    if (file) {
      setIsDisabled(false);
      setCategoryNameImage(file);
      setUpload(true);
    } else {
    }
  };
  const uploadCategoryImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", categoryImage);
      const response = await services.category.UPLOAD_IMAGE(formData);
      setImageResponse(response?.data?.image);

      setIsDisabled(true);
      setUpload(false);
    } catch {}
  };
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value.trimStart();

    if (inputValue.length > 50) {
      setCategoryNameError("Maximum length is 50 characters");
    } else {
      setCategoryName(inputValue);

      setCategoryNameError("");
      if (e.target.value.length == 0) {
        setCategoryNameError("Category Name is required");
      }
    }
  };

 
  const addCategory = async () => {
    try {
      const data = {
        name: categoryName,
        image: imageResponse,
        isActive: selectedValue,
      };

      const response = await services.category.ADD_CATEGORY(data);
      if (response) {
        setIsDisabled(false);
        setToaster({
          type: "success",
          title: "Successful",
          text: "Add Category successfully",
          visiblity: "show",
        });
        setTimeout(() => {
          router.push("/category");
        }, 500);
      }
    } catch (error) {
   
      setToaster({
        type: "error",
        title: "Error Occured",
        text: "Error",
        visiblity: "show",
      });
      setTimeout(() => {
        setToaster({
          visiblity: "hide",
        });
      }, 1500);
    }
  };
  return (
    <div>
      <Toaster
        type={toaster.type}
        title={toaster.title}
        text={toaster.text}
        visiblity={toaster.visiblity}
      />
      <Box sx={{ width: "100%", typography: "body1", p: 5 }}>
        <Card sx={{ mt: 5, pt: 2, pb: 2 }}>
          <CardHeader title="Add Category" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Category Name"
                  name="categoryName"
                  onChange={handleChange}
                 
                  required
                  value={categoryName}
                />
              </Grid>
              {categoryNameError && (
                <>
                  <span
                    style={{
                      marginTop: "4.5rem",
                      marginLeft: "1rem",
                      color: "red",
                      fontSize: "12px",
                      position: "absolute",
                    }}
                  >
                    {categoryNameError}
                  </span>
                </>
              )}
              <Grid xs={12} lg={6} md={6}>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      type="file"
                      required
                      accept="image/*"
                      id="categoryImageInput"
                     
                      onChange={handleImageUploadCategory}
                    />
                  </FormControl>
                  <br />
                  <div>
                    {categoryImage && upload ? (
                      <Avatar
                        src={URL.createObjectURL(categoryImage)}
                        alt={`UploadedImage`}
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "0",
                        }}
                      />
                    ) : (
                      ""
                    )}

                    {categoryImage && upload ? (
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
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Grid>
              <div>
                <FormControl component="fieldset" style={{ marginTop: "20px" }}>
                  <RadioGroup
                    row
                    name="use-radio-group"
                    value={selectedValue}
                    onChange={handleRadioChange}
                  >
                    <span style={{ paddingTop: "8px", marginLeft: "1rem" }}>Status :</span>
                    <span style={{ marginLeft: "20px" }}>
                      <FormControlLabel value={true} control={<Radio />} label="Active" />
                      <FormControlLabel value={false} control={<Radio />} label="In Active" />
                    </span>
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <Button
                variant="contained"
                disabled={!isDisabled || !categoryImage || !categoryName}
                onClick={addCategory}
              >
                Save Details
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
