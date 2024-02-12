/* eslint-disable react/jsx-max-props-per-line */
import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Container, Pagination, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Vendorcard from 'src/sections/vendor/vendor-table';
import { VendorSearch } from "src/sections/vendor/vender-search";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Head from "next/head";
import { useRouter } from "next/router";
import services from "src/services";

const vendors = [
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
]

const Page = () => {
  const router = useRouter()
  const [data, setData] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');

const [vandorData,setVandorData]=useState()
  const getDetails = async () => {
    try {
      let object = {
        page: page,
        limit: rowsPerPage,
        search: search,
      };

      const payload = new URLSearchParams(object).toString();
      const response = await services.userList.GET_USERS(payload);
      const vendorData = response?.data?.data?.rows?.filter(item => item?.role.toLowerCase() === 'vendor');
setVandorData(vendorData)
      setTotalCount(vendorData?.length);
      setData(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);
  const update = (data) => {
    getDetails();
  };

 

  const handleAddClick = () => {
    router.push("/vendoradd")
   
  };
  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(1); 
  }, []);

  const handleInputChange = (inputValue) => {
    setSearch(inputValue)
    getDetails()
  };

  useEffect(() => {
    getDetails();
  }, [search,page,rowsPerPage]);

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
        <VendorSearch onInputChange={handleInputChange}/>
              <Vendorcard
              count={vandorData?.length}
              vendors={vandorData?.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
              onDeselectAll={vandorData?.handleDeselectAll}
              onDeselectOne={vandorData?.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={vandorData?.handleSelectAll}
              onSelectOne={vandorData?.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={vandorData?.selected}
              update={update}
            />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
        <Pagination
                count={Math.ceil(totalCount / rowsPerPage)}  // Adjusted count based on rowsPerPage
                page={page}
                onChange={handlePageChange}
                size="small"
              />
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
