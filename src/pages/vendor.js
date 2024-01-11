/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from "react";
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Vendorcard from 'src/sections/vendor/vendor-table';
import { VendorSearch } from "src/sections/vendor/vender-search";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

const Page = () => {
  const [vendors, setVendors] = useState([
    {
      "id": 1,
      "name": "Vendor A",
      "email": "vendorA@example.com",
      "address": {
        "city": "City A",
        "street": "Street A",
        "zipCode": "12345"
      },
      "phone": "+1234567890",
      "website": "https://www.vendorA.com"
    },
    {
      "id": 2,
      "name": "Vendor B",
      "email": "vendorB@example.com",
      "address": {
        "city": "City B",
        "street": "Street B",
        "zipCode": "67890"
      },
      "phone": "+9876543210",
      "website": "https://www.vendorB.com"
    },
    {
      "id": 3,
      "name": "Vendor C",
      "email": "vendorC@example.com",
      "address": {
        "city": "City C",
        "street": "Street C",
        "zipCode": "54321"
      },
      "phone": "+1122334455",
      "website": "https://www.vendorC.com"
    }
  ]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
       
        <Container maxWidth="xl">
          <Stack spacing={3}>
          <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              
              {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div> */}
            </Stack>
            {/* <VendorSearch/> */}
            <Vendorcard vendors={vendors} setVendors={setVendors} />
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
