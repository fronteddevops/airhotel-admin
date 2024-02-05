/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CategoryCard } from "src/sections/category/category-show";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CategorySearch } from "../sections/category/category-search";
import services from "src/services";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);  
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  // const getDetails = async () => {
  //   const response = await services.category.GET_CATEGORY();

  //   setData(response?.data?.data);

  // };
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const getDetails = async () => {
   
    try {
      let object = {
        page: page,
        limit: rowsPerPage,
        search: search,
      };

      const payload = new URLSearchParams(object).toString();
     
      const response = await services.category.GET_CATEGORY(payload);
   
      setTotalCount(response?.data?.data?.count);
      setData(response?.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(1);  // Reset page to 1 when changing rowsPerPage
  }, []);
  useEffect(() => {
    getDetails();
  }, []);

  const handleAddClick = () => {
    router.push("/categoryadd");
  };
  const update = (data) => {
    getDetails();
  };
  const confirmDelete = (data) => {
    getDetails();
  };

  const handleInputChange = (inputValue) => {
    console.log('Input value from child component:', inputValue);
    setSearch(inputValue)
    getDetails()
    // Do something with the input value in the parent component
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
                <Typography variant="h4">Category</Typography>
              </Stack>
              <div>
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
              </div>
            </Stack>
            <CategorySearch onInputChange={handleInputChange} />
            <CategoryCard
              count={data?.rows?.length}
              items={data?.rows?.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
              onDeselectAll={data?.rows?.handleDeselectAll}
              onDeselectOne={data?.rows?.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={data?.rows?.handleSelectAll}
              onSelectOne={data?.rows?.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={data?.rows?.selected}
              update={update}
              confirmDelete={confirmDelete}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
