/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from "react";
import { Box, Button, Container, Pagination, Stack, SvgIcon, Typography } from "@mui/material";
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
import { PaymentSearch } from "src/sections/payments/payment-search";
import PaymentTable from "src/sections/payments/payment-table";

const Page = () => {
  const router = useRouter();
  const data = [
    {
      id: 123,
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123-456-7890",
      email: "john.doe@example.com",
      paymentId: "abc123def456",
      paymentStatus: "Successful",
      orderId: "789xyz",
      amount: 100.50,
      status:"Paid",
      createdAt: "16 Jan 2024",
    },
    {
      id: 456,
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "987-654-3210",
      email: "jane.smith@example.com",
      paymentId: "def789abc123",
      paymentStatus: "Pending",
      orderId: "xyz789",
      amount: 75.99,
      status:"Paid",
      createdAt: "10 Jan 2024",
    },
    {
      id: 789,
      firstName: "Bob",
      lastName: "Johnson",
      phoneNumber: "111-222-3333",
      email: "bob.johnson@example.com",
      paymentId: "ghi456jkl789",
      paymentStatus: "Failed",
      orderId: "abc123",
      amount: 50.25,
      status:"Failed",
      createdAt: "15 Jan 2024",
    },
    {
      id: 987,
      firstName: "Alice",
      lastName: "Williams",
      phoneNumber: "555-666-7777",
      email: "alice.williams@example.com",
      paymentId: "mno123pqr456",
      paymentStatus: "Successful",
      orderId: "def456",
      amount: 120.75,
      status:"Failed",
      createdAt: "1 Jan 2024",
    },
    {
      id: 654,
      firstName: "Charlie",
      lastName: "Brown",
      phoneNumber: "888-999-0000",
      email: "charlie.brown@example.com",
      paymentId: "stu789vwx123",
      paymentStatus: "Pending",
      orderId: "ghi789",
      amount: 90.50,
      status:"Failed",
      createdAt: "5 Jan 2024",
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
                <Typography variant="h4">Payment List</Typography>
              </Stack>
              
            </Stack>
            <PaymentSearch
             />
            <PaymentTable
              count={data.length}
              items={data}
        
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
                <Pagination
              count={3}
              size="small"
            />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
