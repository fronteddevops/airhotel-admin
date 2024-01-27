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

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CategorySearch } from "../sections/category/category-search";
import services from "src/services";



const Page = () => {
  const router = useRouter();
  const [data,setData]=useState("")

  const getDetails = async () => {
    const response = await services.category.GET_CATEGORY();
   
    setData(response?.data);
    
    
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleAddClick = () => {
    router.push("/categoryadd");
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
            <CategorySearch />
            <CategoryCard
              count={data.length}
              items={data}
              onDeselectAll={data.handleDeselectAll}
              onDeselectOne={data.handleDeselectOne}
              // onPageChange={handlePageChange}
              // onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={data.handleSelectAll}
              onSelectOne={data.handleSelectOne}
              // page={page}
              // rowsPerPage={rowsPerPage}
              selected={data.selected}
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
