/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { HotelCard, Hotelcard } from "src/sections/hotel/hotel-table";
import { HotelSearch } from "src/sections/hotel/hotel-search";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Head from "next/head";
import { useRouter } from "next/router";
import { BookingSearch } from "src/sections/booking/booking-search";
import { BookingTable } from "src/sections/booking/booking-table";
import services from "../services";

const data = [
  {
    id: 1,
    name: "John Doe",
    checkInDate: "2024-01-15",
    checkOutDate: "2024-01-20",
    adult: 2,
    bookingId:2,
    roomId:4,
    paymentType:"cash",
    amount:8900,
    children: 1,
    price: 100,
    totalPrice: 500,
    totalRoom: 2,
    roomQuantity: 1,
    userId: "12345",
    roomId: "67890",
    addressId: "abcde",
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Alice Smith",
    checkInDate: "2024-02-01",
    checkOutDate: "2024-02-10",
    adult: 1,
    children: 0,
    price: 120,
    bookingId:2,
    roomId:4,
    paymentType:"cash",
    amount:8900,
    totalPrice: 1200,
    totalRoom: 1,
    roomQuantity: 1,
    userId: "54321",
    roomId: "98765",
    addressId: "xyzabc",
    status: "Pending",
  },
  {
    id: 3,
    name: "Family Johnson",
    checkInDate: "2024-03-12",
    checkOutDate: "2024-03-20",
    adult: 2,
    children: 3,
    bookingId:2,
    roomId:4,
    paymentType:"cash",
    amount:8900,
    price: 150,
    totalPrice: 1200,
    totalRoom: 2,
    roomQuantity: 1,
    userId: "67890",
    roomId: "12345",
    addressId: "defghi",
    status: "Confirmed",
  },
  {
    id: 4,
    name: "Last Minute Guest",
    checkInDate: "2024-01-25",
    checkOutDate: "2024-01-27",
    adult: 1,
    children: 0,
    price: 80,
    bookingId:2,
    roomId:4,
    paymentType:"cash",
    amount:8900,
    totalPrice: 160,
    totalRoom: 1,
    roomQuantity: 1,
    userId: "24680",
    roomId: "13579",
    addressId: "lmnopq",
    status: "Confirmed",
  },
  {
    id: 5,
    name: "Extended Stay Guest",
    checkInDate: "2024-04-01",
    checkOutDate: "2024-04-15",
    adult: 1,
    children: 0,
    price: 100,
    totalPrice: 1500,
    bookingId:2,
    roomId:4,
    paymentType:"cash",
    amount:8900,
    totalRoom: 1,
    roomQuantity: 1,
    userId: "112233",
    roomId: "445566",
    addressId: "rstuvw",
    status: "Confirmed",
  },
];

const Page = () => {
  const router = useRouter();
const [details,setDetails]=useState(data)

  const getDetails = async () => {
    const response = await services.booking.GET_BOOKING()
    setDetails(response?.data);
    
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <Head>
        <title>Companies | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Booking List</Typography>
              </Stack>
              
            </Stack>
            <BookingSearch />
            <BookingTable
              count={data.length}
              items={data}
        
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            ></Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
