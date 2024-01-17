import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { applyPagination } from "src/utils/apply-pagination";
import {VendorBuyTable} from "src/sections/vendor-buy-subscription/table"
import {VendorBuySearch} from "src/sections/vendor-buy-subscription/search"

import { useRouter } from "next/router";
import services from "src/services";
import { Search } from "@mui/icons-material";

const data = [
  {
    id: 1,
    userName: "Juhi Volke",
    email: "juhi@gmail.com",
    planName: "Plan 1",
    date: "5 Jan 2024",

    price: 29.99,
    currencyType: "usd",
  },
  {
    id: 2,
    userName: "Amit Patel",
    email: "amit@gmail.com",
    planName: "Plan 2",
    date: "10 Jan 2024",
    price: 39.99,
    currencyType: "usd"
  },
  {
    id: 3,
    userName: "Maria Rodriguez",
    email: "maria@gmail.com",
    planName: "Plan 3",
    date: "15 Jan 2024",
    price: 24.99,
    currencyType: "usd"
  },
  {
    id: 4,
    userName: "John Smith",
    email: "john@gmail.com",
    planName: "Plan 4",
    date: "20 Jan 2024",
    price: 49.99,
    currencyType: "usd"
  },
  {
    id: 5,
    userName: "Sara Johnson",
    email: "sara@gmail.com",
    planName: "Plan 5",
    date: "25 Jan 2024",
    price: 19.99,
    currencyType: "usd"
  },
];

const useSubscription = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useSubscriptionIds = (subscription) => {
  return useMemo(() => {
    return subscription.map((subscription) => subscription.id);
  }, [subscription]);
};

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const subscription = useSubscription(page, rowsPerPage);
  const subscriptionIds = useSubscriptionIds(subscription);
  const subscriptionSelection = useSelection(subscriptionIds);
  const [details, setDetails] = useState(data);

  const getDetails = async () => {
    const response = await services.Subscription.GET_SUBSCRIPTION();
    setDetails(response?.data);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleAdd = () => {
    router.push("/subscriptionadd");
  };
  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Vendor Buy Subscription | Devias Kit</title>
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
                <Typography variant="h4">Vendor Buy Subscription List</Typography>
              </Stack>
             
            </Stack>
            <VendorBuySearch />
            <VendorBuyTable
              count={data.length}
              items={data}
              onDeselectAll={data.handleDeselectAll}
              onDeselectOne={data.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={data.handleSelectAll}
              onSelectOne={data.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={data.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
