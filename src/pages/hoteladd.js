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
  Chip,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import services from "../services";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { TimePicker, TimePickerToolbar } from "@mui/x-date-pickers";
import Toaster from "../components/toaster";
import { useRouter } from "next/router";

const initialCheckInTime = new Date();
initialCheckInTime.setHours(8, 0, 0);

const initialCheckOutTime = new Date();
initialCheckOutTime.setHours(12, 0, 0);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "WIFI",
  "PARKING",
  "OTHER",
  "DAILY CLOTHING",
  "LAUNDRY SERVICE",
  "GARDEN",
  "SWIMMING",
  "BREAK FAST(FREE)",
  "TRANSPORT TO AIRPORT",
  "PRESS ALLOWED",
];
const Page = (props) => {
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const expectedSymbols = ["/", "*", "+", "-", "()", "#", "@", "$", "%", "!", "^", "&", "*"];
  const router = useRouter();
  const [categoryList, setCategoryList] = React.useState("");
  const [categoryListError, setCategoryListError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const [data, setData] = useState();

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

  const [selectFacility, setSelectFacility] = useState([]);
  const [selectFacilityError, setSelectFacilityError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [upload, setUpload] = useState(true);
  const [uploadSingle, setUploadSingle] = useState(true);

  const [imageResponseSingle, setImageResponseSingle] = useState("");
  const [categoryImage, setCategoryNameImage] = useState("");
  const [hotelImage, setHotelImage] = useState("");

  const [imageResponse, setImageResponse] = useState();

  const handleImageUploadCategory = (e) => {
   
    const file = e.target.files[0];
    if (file) {
      setIsDisabled(false);
      setCategoryNameImage(file);
      setUploadSingle(true);
    } else {
    }
  };

  const uploadCategoryImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", categoryImage);
      const response = await services.category.UPLOAD_IMAGE(formData);
      setImageResponseSingle(response?.data?.image);

      setIsDisabled(true);
      setUploadSingle(false);
    } catch {}
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    setHotelImage([...hotelImage, ...Array.from(files)]);
    setUpload(true);
  };



  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectFacility(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

 
  const uploadImages = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < hotelImage.length; i++) {
        formData.append(`image`, hotelImage[i]);
      }
     
      const response = await services.hotel.UPLOAD_MULTIPLE_IMAGE(formData);
  
      setImageResponse(response?.data?.fileInformation);
      setIsDisabled(true);
      setUpload(false);
    } catch (err) {
      console.log(err);
    }
  };

 

  const handleChange = (event) => {
    setCategoryList(event.target.value);
  };


  const handleHotelName = (e) => {
    if (e.target.value === "") {
      setHotelNameError("Required");
    } else {
      setHotelName(e.target.value.trimStart());
      setHotelNameError("");
    }
    setHotelName(e.target.value.trimStart());
  };

  const handleHotelAddress = (e) => {
    if (e.target.value === "") {
      setAddressError("Required");
    } else {
      setAddress(e.target.value.trimStart());
      setAddressError("");
    }
    setAddress(e.target.value.trimStart());
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
    const inputValue = e.target.value.trimStart();

    if (inputValue.length === 0) {
      setPincodeError("Required");
    } else if (inputValue.length !== 6) {
      setPincodeError("Pin code must be 6 digits");
    } else {
      setPincode(inputValue);
      setPincodeError("");
    }
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

 

  const handleKey = (e) => {
    if (expectedSymbols.includes(e.key)) {
      e.preventDefault();
    }
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

  const addDetails = async () => {
    if (pincode.length !== 6) {
      setPincodeError("Pin code must be 6 digits");
    }
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
        image: imageResponseSingle,
        featureImage: imageResponse,
      };
      const response = await services.hotel.ADD_HOTEL(data);
      if (response) {
        setToaster({
          type: "success",
          title: "Successful",
          text: "Add Hotel successfully",
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

  const getDetails = async () => {
    try {
      const response = await services.category.GET_CATEGORY();
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <Toaster
        type={toaster.type}
        title={toaster.title}
        text={toaster.text}
        visiblity={toaster.visiblity}
      />
      <Box sx={{ width: "100%", typography: "body1", p: 2, overflowX: "auto" }}>
        <Card sx={{ mt: 2, pt: 2, pb: 2 }}>
          <Typography variant="h5" sx={{ m: 2 }}>
            Add Hotel
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
                      value={categoryList}
                      onChange={handleChange}
                    >
                      {Array.isArray(data) &&
                        data.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.isActive === true ? category.name : ""}
                          
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {categoryListError && (
                    <>
                      <span
                        style={{
                         
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                          
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
                    onChange={(e) => handleHotelName(e)}
                    required
                  />
                  {hotelNameError && (
                    <>
                      <span
                        style={{
                        
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
                       
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
                    onChange={(e) => handleHotelAddress(e)}
                    required
                  />
                  {addressError && (
                    <>
                      <span
                        style={{
                          marginLeft: "0.2rem",
                          color: "red",
                          fontSize: "12px",
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
                    onChange={(e) => handleCity(e)}
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
                    onChange={(e) => handleState(e)}
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
                    onChange={(e) => handleCountry(e)}
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
                    type="number"
                    label="Pin Code"
                    name="pinCode"
                    value={pincode}
                    onChange={(e) => handlePinCode(e)}
                    inputProps={{
                      min: 0,
                      onInput: (e) => {
                        let inputValue = e.target.value;

                        if (inputValue.length > 6) {
                          inputValue = inputValue.slice(0, 6);
                        }

                        setPincode(inputValue);

                        if (inputValue.length < 6) {
                          setPincodeError("Pin code must be 6 digits");
                        } else {
                          setPincodeError("");
                        }

                        e.target.value = inputValue;
                      },
                    }}
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
                    type="text"
                    inputProps={{
                      min: 0,
                    }}
                    onKeyDown={(e) => handleKey(e)}
                    onChange={(e) => handleDisTanceFromAirport(e)}
                    required
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
                    type="text"
                    onKeyDown={(e) => handleKey(e)}
                    onChange={(e) => handleDisTanceFromCenter(e)}
                    required
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
                    onChange={(e) => handleLocation(e)}
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
                    onKeyDown={(e) => handleKey(e)}
                    onChange={(e) => handleNoOfRoom(e)}
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
                    onKeyDown={(e) => handleKey(e)}
                    onChange={(e) => handlePrice(e)}
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
                    label="Check In Time"
                    onChange={(e) => setCheckInTime(e?.target?.value)}
                    required
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
                    label="Check Out Time"
                    onChange={(e) => setCheckOutTime(e?.target?.value)}
                    required
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
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Select Facility</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      multiple
                      value={selectFacility}
                      onChange={handleChangeSelect}
                      
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={selectFacility.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
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
                    onChange={(e) => handleDescription(e)}
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
                <Grid item xs={12} md={6}>
                  <div>
                    <Typography variant="body2" color="textSecondary">
                      Select Multiple files
                    </Typography>
                    <TextField
                      fullWidth
                      type="file"
                      inputProps={{ accept: "image/*", multiple: true }}
                      onChange={handleImageUpload}
                    />
                  </div>

                  {upload && (
                    <>
                      {hotelImage && hotelImage.map((file, index) => (
                        <>
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`hotelImage ${index}`}
                            className="uploaded-image mb-2"
                            height={100}
                            width={100}
                            style={{ borderRadius: "5px" }}
                          />
                          &nbsp;&nbsp; &nbsp;&nbsp;
                        </>
                      ))}

                      <div>
                        {hotelImage.length > 0 && upload ? (
                          <Button variant="contained" color="primary" onClick={uploadImages}>
                            Upload
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  )}
                 
                </Grid>
                <Grid item xs={12} md={6}>
                  <div>
                    <Typography variant="body2" color="textSecondary">
                      Select Single files
                    </Typography>
                    <div>
                      <FormControl fullWidth>
                        <TextField
                          type="file"
                          required
                          accept="image/*"
                          
                          onChange={handleImageUploadCategory}
                        />
                      </FormControl>
                      <br />
                      <div>
                        {categoryImage && uploadSingle ? (
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

                        {categoryImage && uploadSingle ? (
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
                  </div>
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
            <Button variant="contained" disabled={!isDisabled} onClick={addDetails}>
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
