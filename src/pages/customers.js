/* eslint-disable react/jsx-max-props-per-line */
import { useCallback, useEffect, useMemo, useState } from "react";

import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";

import axios from "axios";
import services from "src/services";

const Page = () => {
  const [data, setData] = useState();

  const getDetails = async () => {
    const response = await services.UserList.GET_USERS();
    setData(response?.data);

  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
         
             <CustomersTable
             items={data}
            ></CustomersTable>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
