import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { applyPagination } from 'src/utils/apply-pagination';

import { useRouter } from 'next/router';
import { SupportTable } from 'src/sections/support/support-table';
import { SupportSearch } from 'src/sections/support/support-search';
import services from 'src/services';


const data = [
    { id: 1, title: 'Title 1', subject: 'Subject 1',status:'In progress' },
    { id: 2, title: 'Title 2', subject: 'Subject 2',status:'In progress' },
    { id: 3, title: 'Title 3', subject: 'Subject 3',status:'In progress' },
    // Add more objects as needed
  ];
  


const useSupport = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useSupportIds = (support) => {
  return useMemo(
    () => {
      return support.map((support) => support.id);
    },
    [support]
  );
};



const Page = () => {
  const router = useRouter()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const support = useSupport(page, rowsPerPage);
  const supportIds = useSupportIds(support);
  const supportSelection = useSelection(supportIds);
  const [details,setDetails]=useState()

  const getDetails = async () => {
    const response = await services.Support.GET_SUPPORT()
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
        Support | Devias Kit
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
                Support List
                </Typography>
              
              </Stack>
     
            </Stack>
            <SupportSearch />
            <SupportTable
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
