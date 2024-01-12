/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from "react";
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { Hotelcard } from "src/sections/hotel/hotel-detail";
import { HotelSearch } from "src/sections/hotel/hotel-search";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Head from "next/head";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter()
  const [data, setData] = useState([
    {
      "id": 1,
      "name": "Hotel X",
      "email": "hotelX@example.com",
      "address": {
        "city": "City X",
        "street": "Street X",
        "zipCode": "11111"
      },
      "phone": "+9998887777",
      "website": "https://www.hotelX.com"
    },
    {
      "id": 2,
      "name": "Hotel Y",
      "email": "hotelY@example.com",
      "address": {
        "city": "City Y",
        "street": "Street Y",
        "zipCode": "22222"
      },
      "phone": "+7778889999",
      "website": "https://www.hotelY.com"
    },
    {
      "id": 3,
      "name": "Hotel Z",
      "email": "hotelZ@example.com",
      "address": {
        "city": "City Z",
        "street": "Street Z",
        "zipCode": "33333"
      },
      "phone": "+5556667777",
      "website": "https://www.hotelZ.com"
    }
  ]);
  
  const handleAddClick = () => {
    router.push("/hoteladd")
   
  };

  return (
    <>
    <Head>
      <title>
        Companies | Devias Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Hotel List
              </Typography>
            </Stack>
            <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleAddClick}
                >
                  Add
                </Button>
              </div>
          </Stack>
          <HotelSearch/>
              <Hotelcard
              count={data?.length}
              data={data}
              setData={setData}
        
            />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
      
          </Box>
        </Stack>
      </Container>
    </Box>
  </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
