/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import axios from "axios";
import services from "src/services";




const Page = () => {
  const [data, setData] = useState();
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };
  
  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return customers?.map((customer) => customer.id);
      },
      [customers]
    );
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

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
      <title>
        Companies | Devias Kit
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
                User List
              </Typography>
            </Stack>
            {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  // onClick={handleAddClick}
                >
                  Add
                </Button>
              </div> */}
          </Stack>
        
              <CustomersTable
              count={data}
              items={data}
              onDeselectAll={data?.handleDeselectAll}
              onDeselectOne={data?.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={data?.handleSelectAll}
              onSelectOne={data?.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={data?.selected}
            />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
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
