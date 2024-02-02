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
  const [categoryList, setCategoryList] = React.useState([]);
  const [categoryListError, setCategoryListError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  

  const [hotelName, setHotelName] = useState("");
  const [hotelNameError, setHotelNameError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [distanceFromAirport, setDistanceFromAirport] = useState("");
  const [distanceFromAirportError, setDistanceFromAirportError] = useState("");
  const [distanceFromCenter, setDistanceFromCenter] = useState("");
  const [distanceFromCenterError, setDistanceFromCenterError] = useState("");
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [numberOfRoom, setNumberOfRoom] = useState("");
  const [numberOfRoomError, setNumberOfRoomError] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [startingPriceError, setStartingPriceError] = useState("");
  const [checkInTime, setCheckInTime] = useState(new Date());
  const [checkInTimeError, setCheckInTimeError] = useState();
  const [checkOutTime, setCheckOutTime] = useState(new Date());
  const [checkOutTimeError, setCheckOutTimeError] = useState();
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const [selectFacility, setSelectFacility] = useState([]);
  const [selectFacilityError, setSelectFacilityError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleHotelNameChange = (e) => {
    if (e.target.value === "") {
      setHotelNameError("Required");
    } else {
      setHotelName(e.target.value.trimStart());
      setHotelNameError("");
    }
    setHotelName(e.target.value.trimStart());
  };
  const handleAddressChange = (e) => {
    if (e.target.value === "") {
      setAddressError("Required");
    } else {
      setAddress(e.target.value.trimStart());
      setAddressError("");
    }
    setAddress(e.target.value.trimStart());
  };

const handleChange = (event) => {
  // const selectedValue = event.target.value.trim();
  // setCategoryList(selectedValue);
  // setCategoryName(selectedValue);
  // setCategoryList([]);
  // setCategoryName("");
  // if (selectedValue === "") {
  //   // setCategoryNameError("Required");
  //   setCategoryName("");
  // } else {
  //   // setCategoryNameError("");
  // }
   setCategoryName(event.target.value);
};

  const handleCity = (e) => {
    if (e.target.value === "") {
      setCityError("Required");
    } else {
      setCity(e.target.value.trimStart());
      setCityError("");
    }
    setCity(e.target.value.trimStart());
  };

  const handleState = (e) => {
    if (e.target.value === "") {
      setStateError("Required");
    } else {
      setState(e.target.value.trimStart());
      setStateError("");
    }
    setState(e.target.value.trimStart());
  };

  const handleCountry = (e) => {
    if (e.target.value === "") {
      setCountryError("Required");
    } else {
      setCountry(e.target.value.trimStart());
      setCountryError("");
    }
    setCountry(e.target.value.trimStart());
  };

  const handlePinCode = (e) => {
    if (e.target.value === "") {
      setPincodeError("Required");
    } else {
      setPincode(e.target.value.trimStart());
      setPincodeError("");
    }
    setPincode(e.target.value.trimStart());
  };

  const handleDisTanceFromAirport = (e) => {
    if (e.target.value === "") {
      setDistanceFromAirportError("Required");
    } else {
      setDistanceFromAirport(e.target.value.trimStart());
      setDistanceFromAirportError("");
    }
    setDistanceFromAirport(e.target.value.trimStart());
  };

  const handleDisTanceFromCenter = (e) => {
    if (e.target.value === "") {
      setDistanceFromCenterError("Required");
    } else {
      setDistanceFromCenter(e.target.value.trimStart());
      setDistanceFromCenterError("");
    }
    setDistanceFromCenter(e.target.value.trimStart());
  };

  const handleLocation = (e) => {
    if (e.target.value === "") {
      setLocationError("Required");
    } else {
      setLocation(e.target.value.trimStart());
      setLocationError("");
    }
    setLocation(e.target.value.trimStart());
  };

  const handleNoOfRoom = (e) => {
    if (e.target.value === "") {
      setNumberOfRoomError("Required");
    } else {
      setNumberOfRoom(e.target.value.trimStart());
      setNumberOfRoomError("");
    }
    setNumberOfRoom(e.target.value.trimStart());
  };

  const handlePrice = (e) => {
    if (e.target.value === "") {
      setStartingPriceError("Required");
    } else {
      setStartingPrice(e.target.value.trimStart());
      setStartingPriceError("");
    }
    setStartingPrice(e.target.value.trimStart());
  };

  const handleCheckIn = (e) => {
    if (e?.target?.value === "") {
      setCheckInTimeError("Required");
    } else {
      setCheckInTime(e?.target.value.trimStart());
      setCheckInTimeError("");
    }
    setCheckInTime(e.target.value.trimStart());
  };

  const handleCheckOut = (e) => {
    if (e.target.value === "") {
      setCheckOutTimeError("Required");
    } else {
      setCheckOutTime(e.target.value.trimStart());
      setCheckOutTimeError("");
    }
    setCheckOutTime(e.target.value.trimStart());
  };

  const handleDescription = (e) => {
    if (e.target.value === "") {
      setDescriptionError("Required");
    } else {
      setDescription(e.target.value.trimStart());
      setDescriptionError("");
    }
    setDescription(e.target.value.trimStart());
  };

  const handleChangeFacility = (event) => {
    const {
      target: { value },
    } = event;
    setSelectFacility(value);
  };

  const editDetails = async () => {
    if (hotelName.length === 0) {
      setHotelNameError("Required");
      return;
    } else {
      setHotelNameError("");
    }
    if (categoryList.length === 0) {
      setCategoryListError("Required");
      return;
    } else {
      setCategoryListError("");
    }

    if (address.length === 0) {
      setAddressError("Required");
      return;
    } else {
      setAddressError("");
    }

    if (city.length === 0) {
      setCityError("Required");
      return;
    } else {
      setCityError("");
    }
    if (state.length === 0) {
      setStateError("Required");
      return;
    } else {
      setStateError("");
    }
    if (country.length === 0) {
      setCountryError("Required");
      return;
    } else {
      setCountryError("");
    }
    if (pincode.length === 0) {
      setPincodeError("Required");
      return;
    } else {
      setPincodeError("");
    }
    if (distanceFromAirport.length === 0) {
      setDistanceFromAirportError("Required");
      return;
    } else {
      setDistanceFromAirportError("");
    }
    if (distanceFromCenter.length === 0) {
      setDistanceFromCenterError("Required");
      return;
    } else {
      setDistanceFromCenterError("");
    }
    if (location.length === 0) {
      setLocationError("Required");
      return;
    } else {
      setLocationError("");
    }
    if (numberOfRoom.length === 0) {
      setNumberOfRoomError("Required");
      return;
    } else {
      setNumberOfRoomError("");
    }
    if (startingPrice.length === 0) {
      setStartingPriceError("Required");
      return;
    }
    if (checkInTime?.length === 0) {
      setStartingPriceError("Required");
      return;
    } else {
      setAddressError("");
    }
    if (checkOutTime?.length === 0) {
      setCheckOutTimeError("Required");
      return;
    } else {
      setCheckOutTimeError("");
    }
    if (selectFacility.length === 0) {
      setSelectFacilityError("Required");
      return;
    } else {
      setSelectFacilityError("");
    }
    if (description.length === 0) {
      setDescriptionError("Required");
      return;
    } else {
      setDescriptionError("");
    }
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
      setCategoryName(response?.data?.data?.Category?.name);

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
      setCategoryList(response?.data?.data);
     
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
        visibility={toaster.visibility}
      />
      <Box sx={{ width: "100%", typography: "body1", p: 2, overflowX: "auto" }}>
        <Card sx={{ mt: 2, pt: 2, pb: 2 }}>
          <Typography variant="h5" sx={{ m: 2 }}>
            Edit Hotel
          </Typography>
          <CardContent sx={{ pt: 0, mt: 2 }}>
            <Box sx={{ m: -1 }}>
              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="demo-simple-select-filled-label">Select Category *</InputLabel>

                    <Select 
                     labelId="demo-simple-select-filled-label"
                     id="demo-simple-select-filled"
                     value={categoryName} 
                     onChange={handleChange}
                     >
                       <MenuItem value={categoryName}>{categoryName}</MenuItem>
                      {categoryList?.length > 0 &&
                        categoryList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                             {item.isActive ===true ?  item.name:""}
                          </MenuItem>
                        ))}

                    </Select>
                  </FormControl>
                  {categoryListError && (
                    <>
                      <span
                        style={{
                          // marginTop: "4.5rem",
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                          // position: "absolute",
                        }}
                      >
                        {categoryListError}
                      </span>
                    </>
                  )}
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Hotel Name"
                    name="hotelName"
                    value={hotelName}
                    onChange={handleHotelNameChange}
                    required
                  />
                  {hotelNameError && (
                    <>
                      <span
                        style={{
                          // marginTop: "4.5rem",
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                          // position: "absolute",
                        }}
                      >
                        {hotelNameError}
                      </span>
                    </>
                  )}
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Hotel Address"
                    name="hotelAddress"
                    value={address}
                    onChange={handleAddressChange}
                    required
                  />
                  {addressError && (
                    <>
                      <span
                        style={{
                          // marginTop: "4.5rem",
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                          // position: "absolute",
                        }}
                      >
                        {addressError}
                      </span>
                    </>
                  )}
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={city}
                    onChange={(e) => handleCity}
                    required
                  />
                  {cityError && (
                    <>
                      <span
                        style={{
                         
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                       
                        }}
                      >
                        {cityError}
                      </span>
                    </>
                  )}
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="State/Province"
                    name="stateProvince"
                    value={state}
                    onChange={(e) => handleState}
                    required
                  />
                  {stateError && (
                    <>
                      <span
                        style={{
                        
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                         
                        }}
                      >
                        {stateError}
                      </span>
                    </>
                  )}
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="Country"
                    value={country}
                    onChange={(e) => handleCountry}
                    required
                  />
                  {countryError && (
                    <>
                      <span
                        style={{
                          
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                         
                        }}
                      >
                        {countryError}
                      </span>
                    </>
                  )}
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="pinCode"
                    value={pincode}
                    onChange={(e) => handlePinCode}
                    required
                  />
                  {pincodeError && (
                    <>
                      <span
                        style={{
                         
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                          
                        }}
                      >
                        {pincodeError}
                      </span>
                    </>
                  )}
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Distance From Airport"
                    name="distanceFromAirport"
                    value={distanceFromAirport}
                    onChange={(e) => handleDisTanceFromAirport}
                  />
                  {distanceFromAirportError && (
                    <>
                      <span
                        style={{
                        
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                         
                        }}
                      >
                        {distanceFromAirportError}
                      </span>
                    </>
                  )}
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Distance From Center"
                    name="distanceFromCenter"
                    value={distanceFromCenter}
                    onChange={(e) => handleDisTanceFromCenter}
                  />
                  {distanceFromCenterError && (
                    <>
                      <span
                        style={{
                        
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                        
                        }}
                      >
                        {distanceFromCenterError}
                      </span>
                    </>
                  )}
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={location}
                    onChange={(e) => handleLocation}
                    required
                  />
                  {locationError && (
                    <>
                      <span
                        style={{
                         
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                          
                        }}
                      >
                        {locationError}
                      </span>
                    </>
                  )}
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Number Of Room"
                    name="numberOfRoom"
                    value={numberOfRoom}
                    onChange={(e) => handleNoOfRoom}
                    required
                  />
                  {numberOfRoomError && (
                    <>
                      <span
                        style={{
                        
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                          
                        }}
                      >
                        {numberOfRoomError}
                      </span>
                    </>
                  )}
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Starting Price"
                    name="startingPrice"
                    value={startingPrice}
                    onChange={(e) => handlePrice}
                    required
                  />
                  {startingPriceError && (
                    <>
                      <span
                        style={{
                        
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                         
                        }}
                      >
                        {startingPriceError}
                      </span>
                    </>
                  )}
                </Grid>
                <Grid xs={12} md={6}>
                  <TimePicker
                    fullWidth
                    sx={{ width: "100%" }}
                    value={checkInTime}
                    onChange={(newValue) => handleCheckIn(newValue)}
                    label="Check In Time"
                  />
                  {checkInTimeError && (
                    <>
                      <span
                        style={{
                          
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                         
                        }}
                      >
                        {checkInTimeError}
                      </span>
                    </>
                  )}
                </Grid>

                <Grid xs={12} md={6}>
                  <TimePicker
                    fullWidth
                    sx={{ width: "100%" }}
                    value={checkOutTime}
                    onChange={(newValue) => handleCheckOut(newValue)}
                    label="Check Out Time"
                  />
                  {checkOutTimeError && (
                    <>
                      <span
                        style={{
                       
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                          
                        }}
                      >
                        {checkOutTimeError}
                      </span>
                    </>
                  )}
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
                  {selectFacilityError && (
                    <>
                      <span
                        style={{
                        
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                          
                        }}
                      >
                        {selectFacilityError}
                      </span>
                    </>
                  )}
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Description"
                    name="Description"
                    value={description}
                    onChange={(e) => handleDescription}
                    required
                  />
                  {descriptionError && (
                    <>
                      <span
                        style={{
                          
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                          
                        }}
                      >
                        {descriptionError}
                      </span>
                    </>
                  )}
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
            <Button variant="contained" onClick={editDetails}>
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
