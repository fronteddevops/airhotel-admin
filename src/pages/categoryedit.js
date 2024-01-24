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
import { useEffect, useState } from "react";
import services from "../services";
import { useRouter } from "next/router";
import Toaster from "../components/toaster";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const [isDisabled, setIsDisabled] = useState(true);
  const [categoryImageResponse, setCategoryNameImageResponse] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [categoryImage, setCategoryNameImage] = useState("");
  const [categoryImageExist, setCategoryImageExist] = useState("");
  const [categoryName, setCategoryName] = useState("");
  // const [categoryImage, setCategoryImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const handleImageUploadCategory = (e) => {
    const file = e.target.files[0];

    if (file) {
      setCategoryNameImage(file);
    } else {
      // Handle the case where no file is selected
      setCategoryNameImage(null);
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value.trimStart();
    const truncatedValue = inputValue.slice(0, 150);
    setIsDisabled(true);
    setCategoryName(truncatedValue);
    if (e.target.value.length === 0) {
      setCategoryNameError("Required");
    } else if (inputValue.length > 150) {
      setCategoryNameError("Name must be at least 150 characters");
    } else {
      setCategoryNameError("");
    }
    setCategoryName(e.target.value);
  };

  const handleKeyDown = (e) => {
    const isLetter = /^[a-zA-Z]$/.test(e.key);
    const isBackspace = e.key === "Backspace";

    if (!isLetter && !isBackspace) {
      e.preventDefault();
    }
  };

  const uploadCategoryImage = async () => {
    setCategoryNameImage("");
  
  };

  const handleSubmit= async () => {
   
    try {
      const data = {
        name:categoryName,
        image:existingImage

      };
       
      const response = await services.category.UPDATE_CATEGORY(id, data);
      if(response){
        
        setToaster({
          type: "success",
          title: "Successful",
          text: "Update Category successfully",
          visiblity: "show",
        });
        setTimeout(() => {
          window.location.reload()
        }, 1000);
        
      }
    } catch (error) {
     
      setToaster({
        type: "danger",
        title: "Error Occured",
        text: error.response.data.message,
        visiblity: "show",
      });
      setTimeout(() => {
        setToaster({
          visiblity: "hide",
        });
      }, 1500);
    }
  };

  const getById = async () => {
    const response = await services.category.GET_BY_CATEGORY(id);
    setCategoryName(response?.data?.name);
    setExistingImage(response?.data?.image);
  };

  useEffect(() => {
    getById();
  }, []);
  console.log(existingImage, "image");
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
        <CardHeader title="Edit Category" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Category Name"
                name="categoryName"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
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
              <div style={{ position: "relative" }}>
                <FormControl fullWidth>
                  <TextField
                    type="file"
                    accept="image/*"
                    id="categoryImageInput"
                    onChange={handleImageUploadCategory}
                  />
                  <div style={{ position: "absolute", bottom: "3.6rem" }}>
                    {existingImage && (
                      <Avatar
                        src={existingImage}
                        alt={`ExistingImage`}
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "0",
                        }}
                      />
                    )}

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
            <Button
              variant="contained"
              disabled={!(categoryImage==="" && categoryName )}
              onClick={handleSubmit}
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
