import React, { useEffect, useState } from "react";
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
  CardMedia,
} from "@mui/material";
// import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useRouter } from "next/router";
import services from "../../services";
import constant from "src/constant";
import moment from "moment";


export default function hoteldetails() {
  const router = useRouter();
  const { id } = router.query;
  const [hotelData, setHotelData] = useState();
  const imageUrl = constant.BASE_URL_UPLOADS;

  const getDetails = async () => {
    try {
      const response = await services.hotel.GET_HOTEL_BY_ID(id);
      setHotelData(response?.data?.data);
      console.log(response?.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <Card>
      {/* <CardHeader
          
          title="Hotel Details"
        /> */}

      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom>
          Hotel Information
        </Typography>
        <Card sx={{ marginBottom: 4 }}>
          <CardMedia
          sx={{ marginTop: 4 }}
            component="img"
            height="400"
            crossOrigin="anonymous"
            image={imageUrl + hotelData?.image}
            alt="Hotel Image"
          />
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {hotelData?.name}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ marginTop: 4 }}>
              <strong>Address:</strong> {hotelData?.address} 
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Distance from Airport:</strong> {hotelData?.distanceFromAirport}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Distance from City Center:</strong> {hotelData?.distanceFromCenter}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Number of Rooms:</strong>  {hotelData?.numberOfRoom}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Starting Price:</strong>  {hotelData?.startingPrice}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Check-in Time:</strong> 
              {moment(hotelData?.checkInTime).format(" h:mm A")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Check-out Time:</strong> {moment(hotelData?.checkOutTime).format(" h:mm A")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Facilities:</strong> {hotelData?.selectFacility.map((item,key)=>{
                return(<>{item}, </>)
              })}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong>  {hotelData?.description} 
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Room Details 
            </Typography>
            <CardMedia
            sx={{ marginTop: 4 }}
              component="img"
              height="200"
              crossOrigin="anonymous"
              image={imageUrl + hotelData?.Rooms[0]?.image?.url}
              alt={hotelData?.Rooms[0]?.image?.altText}
            />
            <Typography variant="body1" gutterBottom sx={{ marginTop: 4 }}> 
              <strong>Room Type:</strong> {hotelData?.Rooms[0]?.roomType}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Room Type 2:</strong>  {hotelData?.Rooms[0]?.roomType2}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Extra Mattress:</strong>  {hotelData?.Rooms[0]?.extraMattress===true?"Available":"Unavailable"} &nbsp; ${hotelData?.Rooms[0]?.extraMattressCharge}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Per Night Charge:</strong>  ${hotelData?.Rooms[0]?.perNightCharge}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Monthly Charge:</strong> ${hotelData?.Rooms[0]?.monthlyCharge}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Weekly Charge:</strong> ${hotelData?.Rooms[0]?.weeklyCharge}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Number of Guests:</strong> {hotelData?.Rooms[0]?.numberOfGuest}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Number of Children:</strong> {hotelData?.Rooms[0]?.numberOfChildren}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Amenities:</strong> {hotelData?.Rooms[0]?.roomType2} {hotelData?.Rooms[0]?.selectAmenities.map((item,key)=>{
                return(<>{item}, </>)
              })}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {hotelData?.Rooms[0]?.description}
            </Typography>
          </CardContent>
        </Card>
      </Container>
      {/* <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="First Name *" value={hotelData?.firstName} fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField placeholder="Last Name *" value={hotelData?.lastName} fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField placeholder="Phone Number * " value={hotelData?.contact} fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField placeholder="Email Address *" value={hotelData?.email} fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField placeholder="Country *" value={hotelData?.country} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Pin Code *" value={hotelData?.pincode} fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField placeholder="Date of Birth *" value={hotelData?.Dob} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Hotels *" value={hotelData?.Hotels} fullWidth disabled />
          </Grid>


         
        </Grid>
      </CardContent> */}
    </Card>
  );
}
