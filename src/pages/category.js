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

const category = [
  {
    id: "2569ce0d517a7f06d3ea1f24",
    createdAt: "27/03/2019",

    logo: "/assets/logos/myhotel.avif",
    title: "Mountain View Resorts",
    downloads: "594",
  },
  {
    id: "ed2b900870ceba72d203ec15",
    createdAt: "31/03/2019",

    logo: "/assets/logos/myhotel2.jpeg",
    title: "Modern Comforts",
    downloads: "625",
  },
  {
    id: "a033e38768c82fca90df3db7",
    createdAt: "03/04/2019",

    logo: "/assets/logos/myhotel3.jpeg",
    title: "Charming Villas",
    downloads: "857",
  },
  {
    id: "1efecb2bf6a51def9869ab0f",
    createdAt: "04/04/2019",

    logo: "/assets/logos/myhotel4.avif",
    title: "Eco-Friendly Stays",
    downloads: "406",
  },
];

const Page = () => {
  const router = useRouter();
  const [data,setData]=useState(category)

  const getDetails = async () => {
    const response = await services.Category.GET_CATEGORY();
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
              count={category.length}
              items={category}
              onDeselectAll={category.handleDeselectAll}
              onDeselectOne={category.handleDeselectOne}
              // onPageChange={handlePageChange}
              // onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={category.handleSelectAll}
              onSelectOne={category.handleSelectOne}
              // page={page}
              // rowsPerPage={rowsPerPage}
              selected={category.selected}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
