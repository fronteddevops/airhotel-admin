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
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import services from "../services";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { TimePicker, TimePickerToolbar } from "@mui/x-date-pickers";

const initialCheckInTime = new Date();
initialCheckInTime.setHours(8, 0, 0); // Set initial time to 8:00 AM

const initialCheckOutTime = new Date();
initialCheckOutTime.setHours(12, 0, 0);
const Page = (props) => {
  const [categoryList, setCategoryList] = React.useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [categoryImageResponse, setCategoryNameImageResponse] = useState("");
  const [data, setData] = useState();
  const [categoryImage, setCategoryNameImage] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [distanceFromAirport, setDistanceFromAirport] = useState("");
  const [distanceFromCenter, setDistanceFromCenter] = useState("");
  const [location, setLocation] = useState("");
  const [numberOfRoom, setNumberOfRoom] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [checkInTime, setCheckInTime] = useState(new Date());
  const [checkOutTime, setCheckOutTime] = useState(new Date());

  const [selectFacility, setSelectFacility] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    setCategoryList(event.target.value);
  };

  const handleChangeFacility = (event) => {
    setSelectFacility(event.target.value);
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
  };
  const addDetails = async () => {
    try {
      const data = {
        address: address,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
        distanceFromAirport: distanceFromAirport,
        distanceFromCenter: distanceFromCenter,
        location: location,
        numberOfRoom: numberOfRoom,
        startingPrice: startingPrice,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        description: description,
        selectFacility: selectFacility,
        name: hotelName,

        categoryId: 6,
      };
      const response = await services.hotel.ADD_HOTEL(data);
      console.log(response);
    } catch (error) {}
  };

  const getDetails = async () => {
    try {
      const response = await services.category.GET_CATEGORY();
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1", p: 5 }}>
      <Card sx={{ mt: 5, pt: 2, pb: 2 }}>
        <Typography variant="h5" sx={{ ml: 2.5 }}>
          Add Hotel
        </Typography>
        <CardContent sx={{ pt: 0, mt: 4 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="demo-simple-select-filled-label">Select Category *</InputLabel>

                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={categoryList}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {data &&
                      data.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hotel Name"
                  name="hotelName"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  required
                />
              </Grid>
              {/* <Grid xs={12} md={6}>
                <TextField fullWidth label="Email" name="email" required />
              </Grid> */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hotel Address"
                  name="hotelAddress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Grid>
              {/* <Grid xs={12} md={6}>
                <TextField fullWidth label="Phone Number" name="phone" type="number" />
              </Grid> */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="State/Province"
                  name="stateProvince"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pin Code"
                  name="pinCode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Distance From Airport"
                  name="distanceFromAirport"
                  value={distanceFromAirport}
                  onChange={(e) => setDistanceFromAirport(e.target.value)}
                  type="number"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Distance From Center"
                  name="distanceFromCenter"
                  value={distanceFromCenter}
                  onChange={(e) => setDistanceFromCenter(e.target.value)}
                  type="number"
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Number Of Room"
                  name="numberOfRoom"
                  value={numberOfRoom}
                  onChange={(e) => setNumberOfRoom(e.target.value)}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Starting Price"
                  name="startingPrice"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                  required
                />
              </Grid>
              <Grid xs={12} md={6} width={100}>
                <TimePicker
                  value={checkInTime}
                  onChange={(newValue) => setCheckInTime(newValue)}
                  label="Check In Time"
                />

                <TimePicker
                  sx={{ marginLeft: 4.9, position: "absolute" }}
                  value={checkOutTime}
                  onChange={(newValue) => setCheckOutTime(newValue)}
                  label="Check Out Time"
                />
              </Grid>

              <Grid xs={12} md={6}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="demo-simple-select-filled-label">Select Facility *</InputLabel>

                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={selectFacility}
                    onChange={handleChangeFacility}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    <MenuItem
                      // key={category.id}
                      value="Wifi"
                    >
                      Wifi
                    </MenuItem>
                    <MenuItem
                      // key={category.id}
                      value="swimmingPool"
                    >
                      Swimming Pool
                    </MenuItem>
                    <MenuItem
                      // key={category.id}
                      value="gym"
                    >
                      Gym
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid xs={12} md={6}>
                <div>
                  <FormControl fullWidth>
                   
                    <TextField
                      type="file"
                      accept="image/*"
                      id="categoryImageInput"
                      onChange={handleImageUploadCategory}
                    />
                  </FormControl>
                  <br />
                </div>
                <div>
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
              </Grid> */}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button variant="contained" onClick={addDetails}>
            Save Details
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
