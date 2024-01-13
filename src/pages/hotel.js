/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from "react";
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { HotelCard, Hotelcard } from "src/sections/hotel/hotel-table";
import { HotelSearch } from "src/sections/hotel/hotel-search";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Head from "next/head";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter()
  const data = [
    {
      id: 1,
      hotelName: "Grand Hotel Plaza",
      images: ["plaza1.jpg", "plaza2.jpg"],
      address: "123 Elegant Avenue",
      city: "Metropolis",
      stateProvince: "Metrostate",
      country: "Wonderland",
      zipCode: "54321",
      phoneNumber: "+1 555-123-4567",
      email: "info@grandplaza.com",
      website: "http://www.grandplaza.com",
      amenities: ["Free Wi-Fi", "Spa", "Fine Dining"],
     
      perNightPrice: "$300"
    },
    {
      id: 2,
      hotelName: "Sunset Beach Resort",
      images: ["sunset1.jpg", "sunset2.jpg"],
      address: "456 Seaside Drive",
      city: "Sunsetville",
      stateProvince: "Beachstate",
      country: "Sandsland",
      zipCode: "98765",
      phoneNumber: "+1 555-987-6543",
      email: "reservations@sunsetbeach.com",
      website: "http://www.sunsetbeach.com",
      amenities: ["Beachfront", "Pool", "Water Sports"],
      
      perNightPrice: "$250"
    },
    {
      id: 3,
      hotelName: "Mountain Retreat Lodge",
      images: ["mountain1.jpg", "mountain2.jpg"],
      address: "789 Serene Lane",
      city: "Mountainville",
      stateProvince: "Summitstate",
      country: "Hikerland",
      zipCode: "13579",
      phoneNumber: "+1 555-789-0123",
      email: "info@mountainretreat.com",
      website: "http://www.mountainretreat.com",
      amenities: ["Scenic Views", "Hiking Trails", "Cozy Fireplace"],
      
      perNightPrice: "$180"
    },
    {
      id: 4,
      hotelName: "Urban Loft Boutique",
      images: ["urban1.jpg", "urban2.jpg"],
      address: "101 Loft Street",
      city: "Cityscape",
      stateProvince: "Metrostate",
      country: "Urbania",
      zipCode: "24680",
      phoneNumber: "+1 555-246-8024",
      email: "info@urbanloft.com",
      website: "http://www.urbanloft.com",
      amenities: ["City View", "Rooftop Lounge", "Art Gallery"],
      
      perNightPrice: "$220"
    },
    {
      id: 5,
      hotelName: "Nature's Haven Inn",
      images: ["nature1.jpg", "nature2.jpg"],
      address: "567 Tranquil Road",
      city: "Greenfield",
      stateProvince: "Naturestate",
      country: "Ecohaven",
      zipCode: "56789",
      phoneNumber: "+1 555-567-8901",
      email: "reservations@natureshaven.com",
      website: "http://www.natureshaven.com",
      amenities: ["Nature Trails", "Garden Retreat", "Peaceful Atmosphere"],
      perNightPrice: "$220"
    }
    ];
  
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
          <HotelCard
              count={data.length}
              items={data}
              // onDeselectAll={data.handleDeselectAll}
              // onDeselectOne={data.handleDeselectOne}
              // onPageChange={handlePageChange}
              // onRowsPerPageChange={handleRowsPerPageChange}
              // onSelectAll={data.handleSelectAll}
              // onSelectOne={data.handleSelectOne}
              // page={page}
              // rowsPerPage={rowsPerPage}
              // selected={data.selected}
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
