import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Pagination, Stack, SvgIcon, Typography } from "@mui/material";
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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const subscription = useSubscription(page, rowsPerPage);
  const subscriptionIds = useSubscriptionIds(subscription);
  const subscriptionSelection = useSelection(subscriptionIds);
  const [details, setDetails] = useState(data);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState(10);

  const getDetails = async () => {
    try {
      let object = {
        page: page,
        limit: rowsPerPage,
        search: "",
      };

      const payload = new URLSearchParams(object).toString();
      const response = await await services.rooms.GET_ROOMS(payload);
      setDetails(response?.data?.data?.rows);
      setTotalCount(response?.data?.data?.rows.length);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = () => {
    router.push("/roomsadd");
  };

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);
  const update = (data) => {
    getDetails();
  };

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  }, []);

  const handleInputChange = (inputValue) => {
    setSearch(inputValue);
    getDetails();
  };

  useEffect(() => {
    getDetails();
  }, [search, page, rowsPerPage]);

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
              {/* <div>
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
              </div> */}
            </Stack>
            <RoomSearch onInputChange={handleInputChange} />
            <RoomsTable
              count={details?.length}
              items={details?.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
              onDeselectAll={details?.handleDeselectAll}
              onDeselectOne={details?.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={details?.handleSelectAll}
              onSelectOne={details?.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={details?.selected}
              update={update}
            />
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={Math.ceil(totalCount / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
