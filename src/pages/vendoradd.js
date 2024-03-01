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
  IconButton, InputAdornment
} from "@mui/material";

// import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';

import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import services from "src/services";
import { useRouter } from "next/router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { padding } from "@mui/system";
const Page = (props) => {
  const router = useRouter();
  const { vendors, setVendors } = props;

  const [isAddVendorDialogOpen, setAddVendorDialogOpen] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [FirstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");

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
  const handleAddVendor = () => {
    setVendors((prevVendors) => [...prevVendors, newVendor]);
    setNewVendor({
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      website: "",
    });
    setAddVendorDialogOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewVendor((prevVendor) => ({
      ...prevVendor,
      [field]: value,
    }));
  };

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

  const addVandor = async () => {

    if(phone.length>9&&email&&password&&date&&FirstName&&lastName){
      try {
        const data = {
          firstName: FirstName,
          lastName: lastName,
          contact: phone,
          password: password,
          email: email,
          Dob: date,
          role: "Vendor",
        };
  
        const response = await services.auth.REGISTER_USER(data);
        if (response) {
          setIsDisabled(false);
          setToaster({
            type: "success",
            title: "Successful",
            text: "Add Vendor successfully",
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
    }else{setIsDisabled(false);}
  
  };
  return (
    <Box sx={{ width: "100%", typography: "body1", p: 5 }}>
      <Card sx={{ mt: 5, pt: 2, pb: 2 }}>
        <Typography variant="h5" sx={{ ml: 2.5 }}>
          Add Vendor
        </Typography>
        <CardContent sx={{ pt: 0, mt: 4 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  // onChange={handleChange}
                  required
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

              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}} >
                <TextField
                  fullWidth
                  label="Last Name"
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
                  label="Email"
                  name="email"
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
                  // value={values.lastName}
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
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    const enteredNumber = e.target.value;

                    if (enteredNumber >= 0 || enteredNumber === "") {
                      setPhone(enteredNumber);
                      if (enteredNumber.length > 10||enteredNumber.length < 10) {
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

              <Grid xs={12} md={6} container style={{marginTop:"1rem" ,padding:"1rem"}}>
                <TextField
                  fullWidth
                  type={passwordType}
                  label="Password"
                  name="password"
                  onChange={(e) => {
                    const passwordValue = e.target.value.trimStart();
                    setPassword(passwordValue);

                    if (passwordValue === "") {
                      setPasswordError("Required");
                      setIsDisabled(false);
                    } else if (passwordValue.length < 8 || passwordValue.length > 32) {
                      setIsDisabled(false);
                      setPasswordError("Password must be between 8 and 32 characters");
                    } else if (!/[a-zA-Z]/.test(passwordValue) || !/\d/.test(passwordValue)) {
                      setIsDisabled(false);
                      setPasswordError("Password must contain at least one letter and one number");
                    } else {
                      setPasswordError("");
                      setIsDisabled(true);
                    }
                  }}
                  value={password}
                  onKeyDown={(e) => {
                    exceptThisSymbols.includes(e.key) && e.preventDefault();
                  }}
                  // onChange={handleChange}
                  required
                  // value={values.country}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => {
                    passwordType === "password"
                      ? setPasswordType("text")
                      : setPasswordType("password");
                  }} edge="end">
                          {passwordType === "password" ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {passwordError ? (
                  <p  style={{
                    marginTop: "3.9rem",
                    marginLeft: "1rem",
                    color: "red",
                    fontSize: "12px",
                    position: "absolute",
                  }}>
                    {passwordError}
                  </p>
                ) : null}

                {/* <span
                  className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2 mt-4"
                  data-kt-password-meter-control="visibility"
                  onClick={() => {
                    passwordType === "password"
                      ? setPasswordType("text")
                      : setPasswordType("password");
                  }}
                >
                  {passwordType === "password" ? (
                    <i className="bi bi-eye fs-2"></i>
                  ) : (
                    <i className="bi bi-eye-slash fs-2"></i>
                  )}
                </span> */}
              </Grid>

              <Grid xs={12} md={6} container style={{marginTop:"1rem",padding:"1rem"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    sx={{ width: "100%" }}
                    max={getFifteenYearsAgoDate()}
                    // value={date} 
                    onChange={(date) => {
                      const fifteenYearsAgo = getFifteenYearsAgoDate();
                      if (!date) {
                        // Handle the case where the date is null
                      } else {
                        const selectedDate = new Date(date);
                        const fifteenYearsAgoDate = new Date(fifteenYearsAgo);
                        console.log("Selected date:", selectedDate);
                        if (selectedDate <= fifteenYearsAgoDate) {
                          setDateError("");
                          setIsDisabled(true);
                          setDate(selectedDate);
                        } else {
                          setIsDisabled(false);
                          setDateError("you are not eligible");
                          // Handle the case where the selected date is greater than 15 years ago
                        }
                      }
                    }}
                  />
                </LocalizationProvider>
                {dateError && (
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
                      {dateError}
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
          <Button
            variant="contained"
            disabled={
              !isDisabled || !FirstName || !phone || !password || !email || !date || !lastName
            }
            onClick={addVandor}
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
