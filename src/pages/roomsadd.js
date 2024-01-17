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
    const [imageResponse, setNameImageResponse] = useState("");
  
    const [image, setNameImage] = useState("");
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    //  handle  image
    const handleImageUpload = (e) => {
      setIsDisabled(true);
      setNameImageResponse("");
      const file = e.target.files[0];
      if (file) {
        setNameImage(file);
      } else {
      }
    };
  
    const uploadImage = async () => {
     
        setNameImage("");
        
      
    };
    return (
   
      <Box sx={{width: '100%', typography: 'body1' ,p:5}}>
         <Card sx={{ mt: 5 ,pt:2,pb:2}}>
          <Typography variant="h5" sx={{ ml: 2.5 }}>
            Add Rooms
          </Typography>
          <CardContent sx={{ pt: 0, mt: 4 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <FormControl fullWidth variant="filled" >
                    <InputLabel id="demo-simple-select-filled-label">Select Hotel *</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Hotel One</MenuItem>
                      <MenuItem value={20}>Hotel Second</MenuItem>
                      <MenuItem value={30}>Hotel Third</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl fullWidth variant="filled" >
                    <InputLabel id="demo-simple-select-filled-label">Room Type *</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Deluxe Suite</MenuItem>
                      <MenuItem value={20}>Ocean View Room</MenuItem>
                      <MenuItem value={30}>Family Cabin</MenuItem>
                      <MenuItem value={30}>Standard Room</MenuItem>
                      <MenuItem value={30}>Single Room</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField fullWidth label="Room Price" name="roomPrice" type="number" required />
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl fullWidth variant="filled" >
                    <InputLabel id="demo-simple-select-filled-label">Ac OR Non-Ac *</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ac</MenuItem>
                      <MenuItem value={20}>Non-Ac</MenuItem>
                    
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField fullWidth label="Number Of Guest" name="numberOfGuest" type="number" required />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField fullWidth label="Number Of Children" name="numberOfChildren" type="number" required />
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl fullWidth variant="filled" >
                    <InputLabel id="demo-simple-select-filled-label">Amenities *</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Lunch</MenuItem>
                      <MenuItem value={20}>Dinner</MenuItem>
                      <MenuItem value={20}>Break-Fast</MenuItem>
                    
                    </Select>
                  </FormControl>
                </Grid>
               
                <Grid xs={12} md={6}>
                    <div>
                      <FormControl fullWidth>
                       
                        <TextField
                          type="file"
                          accept="image/*"
                          id="imageInput"
                          onChange={handleImageUpload}
                        />
                      </FormControl>
                      <br />
                    </div>
                    <div >
                    {image && (
                      <Avatar
                        src={URL.createObjectURL(image)}
                        alt={`UploadedImage`}
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "0",
                        }}
                      />
                    )}
  
                    {image && (
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
                        onClick={uploadImage}
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
  