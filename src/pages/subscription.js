import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { applyPagination } from 'src/utils/apply-pagination';
import {SubscriptionCard} from "src/sections/subscription/subscription-table"
import {SubscriptionSearch} from "src/sections/subscription/subscriptionSearch"
import { useRouter } from 'next/router';
import services from 'src/services';


const data = [
  {
    id: 1,
    planName: "Plan 1",
    date: "5 Jan 2024",
    numberOfProducts: 5,
    price: 29.99,
    categoryType: "Category 1"
  },
  {
    id: 2,
    planName: "Plan 2",
    date: "5 Jan 2024",
    numberOfProducts: 10,
    price: 49.99,
    categoryType: "Category 2"
  },
  {
    id: 3,
    planName: "Plan 3",
    date: "5 Jan 2024",
    numberOfProducts: 3,
    price: 19.99,
    categoryType: "Category 3"
  },
  {
    id: 4,
    planName: "Plan 4",
    date: "5 Jan 2024",
    numberOfProducts: 8,
    price: 39.99,
    categoryType: "Category 2"
  },
  {
    id: 5,
    planName: "Plan 5",
    date: "5 Jan 2024",
    numberOfProducts: 6,
    price: 34.99,
    categoryType: "Category 1"
  }
]


const useSubscription = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useSubscriptionIds = (subscription) => {
  return useMemo(
    () => {
      return subscription.map((subscription) => subscription.id);
    },
    [subscription]
  );
};



const Page = () => {
  const router = useRouter()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const subscription = useSubscription(page, rowsPerPage);
  const subscriptionIds = useSubscriptionIds(subscription);
  const subscriptionSelection = useSelection(subscriptionIds);
  const [details,setDetails]=useState(data)


  const getDetails = async () => {
    const response = await services.Subscription.GET_SUBSCRIPTION()
    setDetails(response?.data);
    
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleAdd = () =>{
router.push("/subscriptionadd")
  }
  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
        Subscription | Devias Kit
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
                Subscription List
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
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <SubscriptionSearch />
            <SubscriptionCard
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

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
