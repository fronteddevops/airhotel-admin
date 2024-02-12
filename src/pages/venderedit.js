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
} from "@mui/material";
import { useEffect, useState } from "react";
import services from "../services";
import moment from 'moment';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";

import { useParams } from "next/navigation";
const Page = (props) => {
  const router = useRouter();
  const { vendors, setVendors } = props;
  const { id } = router.query;
  // const param =useParams()
  // console.log("fffffffffff",param);

  const [isAddVendorDialogOpen, setAddVendorDialogOpen] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [FirstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDaate] = useState("");
  const [dateError, setDateError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");

  const [isDisabled, setIsDisabled] = useState("");
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const [passwordType, setPasswordType] = useState("password");

  const exceptThisSymbolsForPhoneNumber = ["e", "E", "-", "*", "/", " "];

  const exceptThisSymbols = ["+", "-", "*", "/", " "];

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const [newVendor, setNewVendor] = useState({
    name: "",
    email: "",
    address: {
      city: "",
    },
    phone: "",
    website: "",
  });

  const getFifteenYearsAgoDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 16);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (mm < 10) {
      mm = `0${mm}`;
    }
    if (dd < 10) {
      dd = `0${dd}`;
    }

    return `${yyyy}-${mm}-${dd}`;
  };

  const getById = async () => {
    const response = await services.vendor.GET_VENDOR_BY_ID(id);
   setDaate(response?.data?.user?.Dob)
    // console.log("111111111111111111111111111111111111111",moment(dattttt).format('MM-DD-YYYY'));
    setFirstName(response.data.user.firstName);
    setLastName(response.data.user.lastName);
    setCity(response.data.user.city);
    setCountry(response.data.user.country);
    setPinCode(response.data.user.pincode);
    setEmail(response.data.user.email);
    setPhone(response.data.user.contact);
    // setDaate(dattttt);
  };

  useEffect(() => {
    getById();
  }, []);
  const editVandor = async () => {
    try {
      const data = {
        firstName: FirstName,
        lastName: lastName,
        contact: phone,
        country: country,
        pincode: pinCode,
        city: city,
        email: email,
        Dob: date,
      };

      const response = await services.vendor.UPDATE_VENDOR(id, data);
      if (response) {
        setIsDisabled(false);
        setToaster({
          type: "success",
          title: "Successful",
          text: "Add Category successfully",
          visiblity: "show",
        });
        setTimeout(() => {
          router.push("/vendor");
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
    <Box sx={{ width: "100%", typography: "body1", p: 5 }}>
      <Card sx={{ mt: 5, pt: 2, pb: 2 }}>
        <Typography variant="h5" sx={{ ml: 2.5 }}>
          Edit Vendor
        </Typography>

        <CardContent sx={{ pt: 0, mt: 4 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}}>
                <TextField
                  fullWidth
                  placeholder="First Name"
                  name="firstName"
                  // onChange={handleChange}
                  required
                  // value={values.firstName}
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setIsDisabled(false);
                      setFirstNameError("Required");
                    } else {
                      setFirstName(e.target.value.trimStart());
                      setFirstNameError("");
                      setIsDisabled(true);
                    }
                    setFirstName(e.target.value.trimStart());
                  }}
                  value={FirstName}
                />
                  {FirstNameError && (
                <>
                  <span
                     style={{
                      marginTop: "3.9rem",
                      marginLeft: "1rem",
                      color: "red",
                      fontSize: "12px",
                      position: "absolute",
                    }}
                  >
                    {FirstNameError}
                  </span>
                </>
              )}
              </Grid>
            

              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}}>
                <TextField
                  fullWidth
                  placeholder="Last Name"
                  name="Last Name"
                  // onChange={handleChange}
                  required
                  // value={values.firstName}
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setIsDisabled(false);
                      setLastNameError("Required");
                    } else {
                      setLastName(e.target.value.trimStart());
                      setLastNameError("");
                      setIsDisabled(true);
                    }
                    setLastName(e.target.value.trimStart());
                  }}
                  value={lastName}
                />
                {LastNameError && (
                <>
                  <span
                      style={{
                        marginTop: "3.9rem",
                        marginLeft: "1rem",
                        color: "red",
                        fontSize: "12px",
                        position: "absolute",
                      }}
                  >
                    {LastNameError}
                  </span>
                </>
              )}
              </Grid>
              
              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}}>
                <TextField
                  fullWidth
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setIsDisabled(false);
                      setEmailError("Required");
                    } else if (!validateEmail(e.target.value.trim())) {
                      setEmailError("Enter a valid email address");
                      setIsDisabled(false);
                    } else {
                      setEmail(e.target.value.trim());
                      setEmailError("");
                      setIsDisabled(true);
                    }
                    setEmail(e.target.value.trimStart());
                  }}
                  onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                  required
                />
                 {emailError && (
                <>
                  <span
                     style={{
                      marginTop: "3.9rem",
                      marginLeft: "1rem",
                      color: "red",
                      fontSize: "12px",
                      position: "absolute",
                    }}
                  >
                    {emailError}
                  </span>
                </>
              )}
              </Grid>
             

              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}}>
                <TextField
                  fullWidth
                  placeholder="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    const enteredNumber = e.target.value;

                    if (enteredNumber >= 0 || enteredNumber === "") {
                      setPhone(enteredNumber);
                      if (enteredNumber.length > 10 ||enteredNumber.length < 10) {
                        setIsDisabled(false);
                        setPhoneError("Must be enter beetween 10 digit");
                      } else if (enteredNumber.length === 0) {
                        setIsDisabled(false);
                        setPhoneError("Required");
                      } else {
                        setPhoneError("");
                        setIsDisabled(true);
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    exceptThisSymbolsForPhoneNumber.includes(e.key) && e.preventDefault();
                    if (
                      e.target.value.length >= 10 &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete"
                    ) {
                      e.preventDefault();

                      setPhoneError("Must be entered between 10 digits");
                      setIsDisabled(false);
                    }
                  }}
                  // onChange={handleChange}
                  type="number"
                  // value={values.phone}
                />
                {phoneError && (
                <>
                  <span
                      style={{
                        marginTop: "3.9rem",
                        marginLeft: "1rem",
                        color: "red",
                        fontSize: "12px",
                        position: "absolute",
                      }}
                  >
                    {phoneError}
                  </span>
                </>
              )}
              </Grid>
              
              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}}>
                <TextField
                  fullWidth
                  placeholder="Country"
                  name="country"
                  // onChange={handleChange}
                  required
                  // value={values.firstName}
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setIsDisabled(false);
                      setCountryError("Required");
                    } else {
                      setCountry(e.target.value.trimStart());
                      setCountryError("");
                      setIsDisabled(true);
                    }
                    setCountry(e.target.value.trimStart());
                  }}
                  value={country}
                />
                 {countryError ? (
               <span
               style={{
                 marginTop: "3.9rem",
                 marginLeft: "1rem",
                 color: "red",
                 fontSize: "12px",
                 position: "absolute",
               }}
           >
             {countryError}
           </span>
              ) : null}
              </Grid>
             

              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}}>
                <TextField
                  fullWidth
                  placeholder="City"
                  name="city"
                  // onChange={handleChange}
                  required
                  // value={values.firstName}
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setIsDisabled(false);
                      setCityError("Required");
                    } else {
                      setCity(e.target.value.trimStart());
                      setCityError("");
                      setIsDisabled(true);
                    }
                    setCity(e.target.value.trimStart());
                  }}
                  value={city}
                />
                  {cityError ? (
                <span
                style={{
                  marginTop: "3.9rem",
                  marginLeft: "1rem",
                  color: "red",
                  fontSize: "12px",
                  position: "absolute",
                }}
            >
              {cityError}
            </span>
              ) : null}
              </Grid>
            

              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}}>
                <TextField
                  fullWidth
                  placeholder="Pin Code"
                  name="pincode"
                  required
                  onChange={(e) => {
                    const enteredNumber = e.target.value.trimStart();
                    if (enteredNumber >= 0 || enteredNumber === "") {
                      setPinCode(enteredNumber);
                     
                      if (enteredNumber.length > 6 || enteredNumber.length < 6) {
                        setPinCodeError("Require Must be enter 6 digit");
                      } else if (enteredNumber.length === 0) {
                        setIsDisabled(false);
                        setPinCodeError("Required");
                      } else {
                        setPinCode(enteredNumber);
                        setPinCodeError("");
                        setIsDisabled(true);
                      }
                    }
                  }}
                  value={pinCode}
                  onKeyDown={(e) => {
                    exceptThisSymbolsForPhoneNumber.includes(e.key) && e.preventDefault();
                    if (e.target.value.length >= 6 && e.key !== "Backspace" && e.key !== "Delete") {
                      e.preventDefault();

                      setPinCodeError("Must be entered only 6 digit");
                      setIsDisabled(false);
                    }
                  }}
                  // onChange={handleChange}
                  type="number"
                />
                   {pinCodeError ? (
               <span
               style={{
                 marginTop: "3.9rem",
                 marginLeft: "1rem",
                 color: "red",
                 fontSize: "12px",
                 position: "absolute",
               }}
           >
             {pinCodeError}
           </span>
              ) : null}
              </Grid>
           

              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    max={getFifteenYearsAgoDate()}
                    // value={date}
                    // selected={date}
                    // defaultValue={dayjs(date)}

                    onChange={(date) => {
                      const fifteenYearsAgo = getFifteenYearsAgoDate();
                      if (!date) {
                      } else {
                        const selectedDate = new Date(date);
                        const fifteenYearsAgoDate = new Date(fifteenYearsAgo);
                        console.log("Selected date:", selectedDate);
                        if (selectedDate <= fifteenYearsAgoDate) {
                          setDateError("");
                          setIsDisabled(true);
                          setDaate(selectedDate);
                        } else {
                          setIsDisabled(false);
                          setDateError("you are not eligible");
                        }
                      }
                    }
                  }
                  />
                </LocalizationProvider>
                {dateError && ( 
                  <>
                    <span
               style={{
                 marginTop: "3.9rem",
                 marginLeft: "1rem",
                 color: "red",
                 fontSize: "12px",
                 position: "absolute",
               }}
           >
             {dateError}
           </span>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </CardContent>

        {/* <CardContent sx={{ pt: 0 ,mt:4}}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Vendor Name"
                  name="vendorName"
                  // onChange={handleChange}
                  required
                  // value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Email"
                  name="email"
                  // onChange={handleChange}
                  required
                  // value={values.lastName}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Phone Number"
                  name="phone"
                  // onChange={handleChange}
                  type="number"
                  // value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Password"
                  name="password"
                  // onChange={handleChange}
                  required
                  // value={values.country}
                />
              </Grid>
              <Grid xs={12} md={6} >
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker sx={{ width: "100%" }} />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </CardContent> */}
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
              !isDisabled ||
              !FirstName ||
              !phone ||
              !city ||
              !email ||
              !date ||
              !lastName ||
              !country ||
              !pinCode
            }
            onClick={editVandor}
          >
            Save Details
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
