/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from "react";
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Vendorcard from 'src/sections/vendor/vendor-table';
import { VendorSearch } from "src/sections/vendor/vender-search";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Head from "next/head";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter()
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
  const handleAddClick = () => {
    router.push("/vendoradd")
   
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
                Vendor List
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
        <VendorSearch/>
              <Vendorcard
              count={vendors?.length}
              vendors={vendors} 
              setVendors={setVendors}
              // onDeselectAll={vendors.handleDeselectAll}
              // onDeselectOne={vendors.handleDeselectOne}
              // onPageChange={handlePageChange}
              // onRowsPerPageChange={handleRowsPerPageChange}
              // onSelectAll={vendors.handleSelectAll}
              // onSelectOne={vendors.handleSelectOne}
              // page={page}
              // rowsPerPage={rowsPerPage}
              // selected={vendors.selected}
            />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {/* <Pagination
              count={3}
              size="small"
            /> */}
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
