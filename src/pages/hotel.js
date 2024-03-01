/* eslint-disable react/jsx-max-props-per-line */
import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Container, Pagination, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { HotelCard, Hotelcard } from "src/sections/hotel/hotel-table";
import { HotelSearch } from "src/sections/hotel/hotel-search";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Head from "next/head";
import { useRouter } from "next/router";
import services from "src/services";

const Page = () => {
  const router = useRouter();
  const [hotelDetails, setHotelDetails] = useState();
  const [data, setData] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState('');
  const getDetails = async () => {
    try {
      let object = {
        page: page,
        limit: rowsPerPage,
        search: search,
      };

      const payload = new URLSearchParams(object).toString();
      const response = await services.hotel.GET_HOTEL(payload);
        setHotelDetails(response?.data?.data.rows);
      setTotalCount(response?.data?.data?.count);
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

  useEffect(() => {
    getDetails();
  }, []);

  
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
                <Typography variant="h4">Hotel List</Typography>
              </Stack>
              {/* <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleAddClick}
                >

                  Add
                </Button>
              </div> */}
            </Stack>
            <HotelSearch  onInputChange={handleInputChange}/>
            <HotelCard
              count={hotelDetails?.length}
              items={hotelDetails?.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
              onDeselectAll={hotelDetails?.handleDeselectAll}
              onDeselectOne={hotelDetails?.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={hotelDetails?.handleSelectAll}
              onSelectOne={hotelDetails?.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={hotelDetails?.selected}
              update={update}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination  count={Math.ceil(totalCount / rowsPerPage)} 
                page={page}
                onChange={handlePageChange}
                size="small"/>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
