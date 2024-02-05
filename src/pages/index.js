/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";

import { Box, Button, Container, Pagination, Stack, SvgIcon, Typography } from "@mui/material";
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
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState(10);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);

  }, []);

  const handleRowsPerPageChange = useCallback((event) => {

    setRowsPerPage(event.target.value);
  }, []);

  const getDetails = async () => {
    try {
      let object = {
        page: page,
        limit: rowsPerPage,
        search: search,
      };

      const payload = new URLSearchParams(object).toString();
      const response = await services.userList.GET_USERS(payload);
      setTotalCount(response?.data?.data?.count);
      setData(response?.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageClick = (event) => {
    const crrPage = event.selected + 1;
    setCurrentPage(crrPage);
    setPage(crrPage);
  };

  const handleInputChange = (inputValue) => {
    console.log('Input value from child component:', inputValue);
    setSearch(inputValue)
    // Do something with the input value in the parent component
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
          width: "100%",
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">User List</Typography>
              </Stack>
            </Stack>
            <CustomersSearch onInputChange={handleInputChange} />
            <CustomersTable
              count={data?.rows?.length}
              items={data?.rows}
              onDeselectAll={data?.rows?.handleDeselectAll}
              onDeselectOne={data?.rows?.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={data?.rows?.handleSelectAll}
              onSelectOne={data?.rows?.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={data?.rows?.selected}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={Math.ceil(totalCount / rowsPerPage)} page={page} onChange={handlePageChange} size="small" />

              {/* <Pagination count={totalCount} size="small" /> */}



            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
