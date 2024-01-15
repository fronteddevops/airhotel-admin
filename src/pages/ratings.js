/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from "react";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { HotelCard, Hotelcard } from "src/sections/hotel/hotel-table";
import { HotelSearch } from "src/sections/hotel/hotel-search";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Head from "next/head";
import { useRouter } from "next/router";
import { BookingSearch } from "src/sections/booking/booking-search";
import { BookingTable } from "src/sections/booking/booking-table";
import RatingsTable from "src/sections/ratings/ratings-table";
import { RatingsSearch } from "src/sections/ratings/rating-search";

const Page = () => {
  const router = useRouter();
  const data = [
    {
        id: 1,
        name: "John Doe",
        bookingId: 2,
        review: "Great experience!",
        ratings: "5 stars",
        status: "Confirmed",
    },
    {
        id: 2,
        name: "Jane Smith",
        bookingId: 3,
        review: "Wonderful service!",
        ratings: "4 stars",
        status: "Confirmed",
    },
    {
        id: 3,
        name: "Bob Johnson",
        bookingId: 4,
        review: "Needs improvement.",
        ratings: "2 stars",
        status: "Pending",
    },
    {
        id: 4,
        name: "Alice Williams",
        bookingId: 5,
        review: "No complaints!",
        ratings: "5 stars",
        status: "Confirmed",
    },
    {
        id: 5,
        name: "Charlie Brown",
        bookingId: 6,
        review: "Average experience.",
        ratings: "3 stars",
        status: "Pending",
    },
  ];

  const handleAddClick = () => {
    router.push("/hoteladd");
  };

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
                <Typography variant="h4">Ratings List</Typography>
              </Stack>
              
            </Stack>
            <RatingsSearch
             />
            <RatingsTable
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
