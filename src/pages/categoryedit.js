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
import constant from "src/constant";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const [isDisabled, setIsDisabled] = useState(true);
  const [categoryImageResponse, setCategoryNameImageResponse] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [categoryImage, setCategoryNameImage] = useState("");
 
  const [categoryName, setCategoryName] = useState("");

  const [existingImage, setExistingImage] = useState([]);
  const [upload, setUpload] = useState(true);
  const [check , setCheck] =useState(false)
  
  const handleImageUploadCategory = (e) => {
    
    setCheck(true)
   
    const file = e.target.files[0];
 
    if (file) {
      setIsDisabled(false)
      setCategoryNameImage(file);
      setUpload(true)
      
    } else {
     
      setCategoryNameImage(null);
      
    }
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

 

  const uploadCategoryImage = async () => {
    
    try {
     
      const formData = new FormData();
      formData.append("image", categoryImage);
      const response = await services.category.UPLOAD_IMAGE(formData);
      if(response){
        setCategoryNameImageResponse(response?.data?.image);
        setIsDisabled(true)
        setUpload(false);
       
      }
      
     
    } catch (err) {
      console.log(err);
    }

   
  };

  const handleSubmit = async () => {
   
    try {
      const data = {
        name: categoryName,
        image:(check === true ? categoryImageResponse : existingImage)
      };
    
      const response = await services.category.UPDATE_CATEGORY(id, data);
      if (response) {
        setIsDisabled(false);
        setToaster({
          type: "success",
          title: "Successful",
          text: "Update Category successfully",
          visiblity: "show",
        });
        setTimeout(() => {
          router.push("/category");
        }, 1000);
      }
    } catch (error) {
      setToaster({
        type: "error",
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
    const response = await services.category.GET_CATEGORY_BY_ID(id);
    setCategoryName(response?.data?.name);
    setExistingImage(response?.data?.image);
  };

  useEffect(() => {
    getById();
  }, []);
 
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
                <div style={{ position: "relative" }}>
                  <FormControl fullWidth>
                    <TextField
                      type="file"
                      accept="image/*"
                      id="categoryImageInput"
                      onChange={handleImageUploadCategory}
                    />
                    <div style={{ position: "absolute", bottom: "3.6rem" }}>
                      {categoryImage ?  (
                        <Avatar
                        src={URL.createObjectURL(categoryImage)}
                        alt={`NewImage`}
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "0",
                        }}
                      
                        />
                        ) : (
                          <img
                          crossOrigin="anonymous"
                          src={constant.BASE_URL_UPLOADS + existingImage}
                          alt={`ExistingImage`}
                          style={{
                            height: "100px",
                            width: "100px",
                            borderRadius: "0",
                          }}
                          
                          />
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
              <Button variant="contained" disabled={(!isDisabled)||(categoryNameError)} onClick={handleSubmit}>
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
