/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Pagination, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { HotelCard, Hotelcard } from "src/sections/hotel/hotel-table";
import { HotelSearch } from "src/sections/hotel/hotel-search";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Head from "next/head";
import { useRouter } from "next/router";
import { BookingSearch } from "src/sections/booking/booking-search";
import { BookingTable } from "src/sections/booking/booking-table";
import services from "../services";



const Page = () => {
  const router = useRouter();
  const [details, setDetails] = useState();

  const getDetails = async () => {
    const response = await services.booking.GET_BOOKING();
    setDetails(response?.data?.data?.rows);
    console.log(response?.data?.data?.rows,"kkkkkkkkkkkkkkk");
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
            <BookingTable count={details.length} items={details} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
