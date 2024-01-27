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
import { useRouter } from "next/router";
import Toaster from "src/components/toaster";

const initialCheckInTime = new Date();
initialCheckInTime.setHours(8, 0, 0);
const initialCheckOutTime = new Date();
initialCheckOutTime.setHours(12, 0, 0);
const Page = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [categoryList, setCategoryList] = React.useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const [data, setData] = useState();
  const [categoryImage, setCategoryNameImage] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotelNameError, setHotelNameError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [distanceFromAirport, setDistanceFromAirport] = useState();
  const [distanceFromCenter, setDistanceFromCenter] = useState();
  const [location, setLocation] = useState("");
  const [numberOfRoom, setNumberOfRoom] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [checkInTime, setCheckInTime] = useState();
  const [checkOutTime, setCheckOutTime] = useState();
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const [selectFacility, setSelectFacility] = useState([]);

  const [description, setDescription] = useState("");
  const [isHotelNameValid, setIsHotelNameValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);

  const handleHotelNameChange = (e) => {
    const value = e.target.value;
    setHotelName(value);
    setIsHotelNameValid(value.trim() !== ""); 
  };
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setIsAddressValid(value.trim() !== ""); 
  };
  const handleChange = (event) => {
    setCategoryList(event.target.value);
  };
  const handleChangeFacility = (event) => {
    const {
      target: { value },
    } = event;
    setSelectFacility(value);
  };

  const handleHotelChange = (e) => {
    setHotelName(e.target.value);
  };

  const editDetails = async () => {
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
        categoryId: categoryList,
      };
      const response = await services.hotel.UPDATE_HOTEL(id, data);
      if (response) {
        setIsDisabled(false);
        setToaster({
          type: "success",
          title: "Successful",
          text: "Updated  successfully",
          visiblity: "show",
        });
        setTimeout(() => {
          router.push("/hotel");
        }, 500);
      }
    } catch (error) {
      setIsDisabled(true);
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

  const getHotels = async () => {
    try {
      const response = await services.hotel.GET_HOTEL_BY_ID(id);
      setHotelName(response?.data?.data?.name);
      setAddress(response?.data?.data?.address);
      setCity(response?.data?.data?.city);
      setState(response?.data?.data?.state);
      setCountry(response?.data?.data?.country);
      setPincode(response?.data?.data?.pincode);
      setDistanceFromAirport(response?.data?.data?.distanceFromAirport);

      setDistanceFromCenter(response?.data?.data?.distanceFromCenter);
      setLocation(response?.data?.data?.location);
      setNumberOfRoom(response?.data?.data?.numberOfRoom);
      setStartingPrice(response?.data?.data?.startingPrice);
      setDescription(response?.data?.data?.description);
      setSelectFacility(response?.data?.data?.selectFacility);
    } catch (error) {
      console.log(error);
    }
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
    getHotels();
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
          <Typography variant="h5" sx={{ ml: 2.5 }}>
            Edit Hotel
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
                    onChange={handleHotelNameChange}
                    error={!isHotelNameValid}
                    helperText={!isHotelNameValid ? "Hotel Name is required" : ""}
                    required
                  />
                </Grid>
                {hotelNameError && (
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
                      {hotelNameError}
                    </span>
                  </>
                )}
                {/* <Grid xs={12} md={6}>
                <TextField fullWidth label="Email" name="email" required />
              </Grid> */}
                <Grid xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Hotel Address"
                    name="hotelAddress"
                    value={address} 
                    onChange={handleAddressChange}
                    error={!isAddressValid}
                    helperText={!isAddressValid ? "Hotel Address is required" : ""}
                    required
                  />
                </Grid>
                {addressError && (
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
                      {addressError}
                    </span>
                  </>
                )}
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
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Distance From Center"
                    name="distanceFromCenter"
                    value={distanceFromCenter}
                    onChange={(e) => setDistanceFromCenter(e.target.value)}
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
                      multiple
                      value={selectFacility}
                      onChange={handleChangeFacility}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      <MenuItem value={["Wifi"]}>Wifi</MenuItem>
                      <MenuItem value={["swimmingPool"]}>Swimming Pool</MenuItem>
                      <MenuItem value={["gym"]}>Gym</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Description"
                    name="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Grid>
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
            <Button
              variant="contained"
              disabled={
                !(
                  categoryList &&
                  hotelName?.trim() &&
                  address.trim() &&
                  city &&
                  state &&
                  country &&
                  pincode &&
                  distanceFromAirport &&
                  distanceFromCenter &&
                  location &&
                  numberOfRoom &&
                  startingPrice &&
                  checkInTime &&
                  checkOutTime &&
                  selectFacility &&
                  description
                )
              }
              onClick={editDetails}
            >
              Save Details
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
