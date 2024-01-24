/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Pagination, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CouponTable } from "src/sections/coupon/table";
import { CouponSearch } from "src/sections/coupon/search";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Head from "next/head";
import { useRouter } from "next/router";
import services from "src/services";

const data = [
  {
    id: 1,
    couponCode: "SAVE10",
    discount: 10,
    description: "10% off on your purchase",
    createdAt: "04 Jan 2024",
  },
  {
    id: 2,
    couponCode: "FREESHIP",
    discount: 0,
    description: "Free shipping on all orders",
    createdAt: "04 Jan 2024",
  },
  {
    id: 3,
    couponCode: "HOLIDAY20",
    discount: 20,
    description: "Special holiday discount",
    createdAt: "04 Jan 2024",
  },
  {
    id: 4,
    couponCode: "LOYALTY25",
    discount: 25,
    description: "Loyalty program discount",
    createdAt: "04 Jan 2024",
  },
  {
    id: 5,
    couponCode: "FLASHSALE",
    discount: 15,
    description: "Flash sale - limited time offer",
    createdAt: "04 Jan 2024",
  },
]

const Page = () => {
  const router = useRouter();
  const [details, setDetails] = useState(data);

  const getDetails = async () => {
    const response = await services.coupon.GET_COUPON()
    setDetails(response?.data);
  };

  useEffect(() => {
    getDetails();
  }, []);
  const handleAddClick = () => {
    router.push("/couponadd");
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
                <Typography variant="h4">Coupon List</Typography>
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
            <CouponSearch />
            <CouponTable count={data?.length} items={data} setDetails={setDetails} />
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
