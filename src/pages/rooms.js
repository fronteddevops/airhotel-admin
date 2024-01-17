import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { applyPagination } from "src/utils/apply-pagination";
import { RoomsTable } from "src/sections/rooms/table";
import { RoomSearch } from "src/sections/rooms/search";
import { useRouter } from "next/router";
import services from "src/services";

const data = [
  {
    id: 1,
    hotelName: "Grand Plaza Hotel",
    roomType: "Deluxe Suite",
    extraMattress: "Yes",
    roomPrice: 250,
    acornonac: "AC",
    numberOfGuest: "5",
    numberOfChildren: "2",
    amenities: "Lunch",
    roomImages: "/assets/logos/myhotel.avif",
    status: "Booked",
  },
  {
    id: 2,
    hotelName: "Sunset Resort",
    roomType: "Ocean View Room",
    extraMattress: "No",
    roomPrice: 180,
    acornonac: "Non-AC",
    numberOfGuest: "5",
    numberOfChildren: "2",
    amenities: "Lunch",
    roomImages: "/assets/logos/myhotel.avif",
    status: "Available",
  },
  {
    id: 3,
    hotelName: "Mountain Retreat Inn",
    roomType: "Family Cabin",
    extraMattress: "Yes",
    roomPrice: 300,
    acornonac: "AC",
    numberOfGuest: "5",
    numberOfChildren: "2",
    amenities: "Lunch",
    roomImages: "/assets/logos/myhotel.avif",
    status: "Booked",
  },
  {
    id: 4,
    hotelName: "City Lights Inn",
    roomType: "Standard Room",
    extraMattress: "No",
    roomPrice: 120,
    acornonac: "AC",
    numberOfGuest: "5",
    numberOfChildren: "2",
    amenities: "Lunch",
    roomImages: "/assets/logos/myhotel.avif",
    status: "Available",
  },
  {
    id: 5,
    hotelName: "Cozy Cottage Lodge",
    roomType: "Single Room",
    extraMattress: "Yes",
    roomPrice: 90,
    acornonac: "Non-AC",
    numberOfGuest: "5",
    numberOfChildren: "2",
    amenities: "Lunch",
    roomImages: "/assets/logos/myhotel.avif",
    status: "Booked",
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
    router.push("/roomsadd");
  };
  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Rooms | Devias Kit</title>
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
                <Typography variant="h4">Rooms List</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <RoomSearch />
            <RoomsTable
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
