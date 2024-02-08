/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  InputLabel,
  Box,
  TextField,
  Container,
  Avatar,
  Paper
} from "@mui/material";
import { useRouter } from "next/router";
import services from "src/services";
import constant from "src/constant";

export const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState();
  const [userImageData, setUserImageData] = useState();

  const imageUrl = constant.BASE_URL_UPLOADS;

  const getDetails = async () => {
    try {
      const response = await services.userList.GET_USERS_BY_ID(id);
      setUserData(response?.data?.user );
      setUserImageData(response?.data?.user?.image?.url)
      console.log(response?.data?.user?.image?.url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (

    <Container maxWidth="md">
    <Typography variant="h3" gutterBottom>
      User Information
    </Typography>
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Avatar
            alt="User Image"
            crossOrigin="anonymous"
            image={imageUrl + userImageData}
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
        <Grid item xs={12} sm>
          <Box>
            <Typography variant="h5">Name: {userData?.firstName} &nbsp; {userData?.lastName}</Typography>
            <Typography variant="body1"><strong>Email:</strong>  {userData?.lastName}</Typography>
            <Typography variant="body1"><strong>Role:</strong>  {userData?.role}</Typography>
            <Typography variant="body1"><strong>Date of Birth:</strong> N/A {userData?.Dob}</Typography>
            <Typography variant="body1"><strong>City:</strong>  {userData?.city}</Typography>
            <Typography variant="body1"><strong>Pin Code:</strong>  {userData?.pincode}</Typography>
            <Typography variant="body1"><strong>Country:</strong>  {userData?.country}</Typography>
            <Typography variant="body1"><strong>Company Name:</strong>  {userData?.companyName}</Typography>
            <Typography variant="body1"><strong>Contact:</strong>  {userData?.contact}</Typography>
            <Typography variant="body1"><strong>Verified:</strong>  {userData?.isVerify==true?"Yes":"No"}</Typography>
            <Typography variant="body1"><strong>Hotels:</strong>  {userData?.Hotels}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  </Container>

    // <Card>
    //     <CardHeader
          
    //       title="User Details"
    //     />
    //   <CardContent>
    //     <Grid container spacing={2}>
    //       <Grid item xs={12} sm={6}>
    //         <TextField label="First Name *" value="John" fullWidth disabled />
    //       </Grid>

    //       <Grid item xs={12} sm={6}>
    //         <TextField label="Last Name *" value="Doe" fullWidth disabled />
    //       </Grid>

    //       <Grid item xs={12} sm={6}>
    //         <TextField label="Phone Number * " value="1234567890" fullWidth disabled />
    //       </Grid>

    //       <Grid item xs={12} sm={6}>
    //         <TextField label="Email Address *" value="john@gmail.com" fullWidth disabled />
    //       </Grid>

    //       <Grid item xs={12} sm={6}>
    //         <TextField label="Date of Birth *" value="4/01/2007" fullWidth disabled />
    //       </Grid>

         
    //     </Grid>
    //   </CardContent>
    // </Card>
  );
};
