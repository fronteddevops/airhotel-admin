/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";

import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";

import services from "src/services";

const user = [
  {
    id: 1,
    user_name: "JohnDoe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    date_of_birth: "1990-05-15",
  },
  {
    id: 2,
    user_name: "AliceSmith",
    email: "alice.smith@example.com",
    phone: "987-654-3210",
    date_of_birth: "1985-08-22",
  },
  {
    id: 3,
    user_name: "AliceSmith",
    email: "alice.smith@example.com",
    phone: "987-654-3210",
    date_of_birth: "1985-08-22",
  },
  {
    id: 4,
    user_name: "AliceSmith",
    email: "alice.smith@example.com",
    phone: "987-654-3210",
    date_of_birth: "1985-08-22",
  },
  {
    id: 5,
    user_name: "AliceSmith",
    email: "alice.smith@example.com",
    phone: "987-654-3210",
    date_of_birth: "1985-08-22",
  },
];

const Page = () => {
  const [data, setData] = useState(user);
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(data, page, rowsPerPage);
    }, [page, rowsPerPage]);
  };

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers?.map((customer) => customer.id);
    }, [customers]);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const getDetails = async () => {
    const response = await services.UserList.GET_USERS();
    setData(response?.data);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <Head>
        <title>User List | Devias Kit</title>
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
                <Typography variant="h4">User List</Typography>
              </Stack>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data?.length}
              items={data}
              onDeselectAll={data?.handleDeselectAll}
              onDeselectOne={data?.handleDeselectOne}
              // onPageChange={handlePageChange}
              // onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={data?.handleSelectAll}
              onSelectOne={data?.handleSelectOne}
              // page={page}
              // rowsPerPage={rowsPerPage}
              selected={data?.selected}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            ></Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
