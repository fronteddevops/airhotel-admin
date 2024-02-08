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
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import services from "src/services";
import { useRouter } from "next/router";
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
    try {
      const data = {
        firstName: FirstName,
        lastName: lastName,
        contact: phone,
        password: password,
        email: email,
        Dob: date,
        role:"Vendor"
      };

      const response = await services.auth.REGISTER_USER(data);
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
          Add Vendor
        </Typography>
        <CardContent sx={{ pt: 0, mt: 4 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
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
              </Grid>
              {FirstNameError && (
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
                    {FirstNameError}
                  </span>
                </>
              )}

<Grid xs={12} md={6}>
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
              </Grid>
              {LastNameError && (
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
                    {LastNameError}
                  </span>
                </>
              )}
              <Grid xs={12} md={6}>
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
              </Grid>
              {emailError && (
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
                    {emailError}
                  </span>
                </>
              )}

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    const enteredNumber = e.target.value;

                    if (enteredNumber >= 0 || enteredNumber === "") {
                      setPhone(enteredNumber);
                      if (enteredNumber.length > 13) {
                        setIsDisabled(false);
                        setPhoneError("Must be enter beetween  7 and  13 digit");
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
                      e.target.value.length >= 15 &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete"
                    ) {
                      e.preventDefault();

                      setPhoneError("Must be entered between 7 and 15 digits");
                      setIsDisabled(false);
                    }
                  }}
                  // onChange={handleChange}
                  type="number"
                  // value={values.phone}
                />
              </Grid>
              {phoneError && (
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
                    {phoneError}
                  </span>
                </>
              )}
              <Grid xs={12} md={6}>
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
                />
              </Grid>
              {passwordError ? (
                <p className="text-start  position-absolute mt-1" style={{ color: "red" }}>
                  {passwordError}
                </p>
              ) : null}

              <span
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
              </span>
              <Grid xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    max={getFifteenYearsAgoDate()}
                    value={date} // Add this line to set the value of the DatePicker
                    onChange={(date) => {
                      const fifteenYearsAgo = getFifteenYearsAgoDate();
                      if (!date) {
                        // Handle the case where the date is null
                      } else {
                        const selectedDate = new Date(date);
                        const fifteenYearsAgoDate = new Date(fifteenYearsAgo);
                        console.log("Selected date:", selectedDate);
                        if (selectedDate <= fifteenYearsAgoDate) {
                          setDateError("")
                          setIsDisabled(true);
                          setDate(selectedDate);
                        } else {
                          setIsDisabled(false);
                          setDateError("you are not eligible")
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
            disabled={!isDisabled || !FirstName || !phone || !password || !email || !date || !lastName}
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
