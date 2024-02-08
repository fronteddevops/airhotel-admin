import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Pagination, Stack, SvgIcon, Typography } from '@mui/material';
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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [search, setSearch] = useState('');
  const support = useSupport(page, rowsPerPage);
  const supportIds = useSupportIds(support);
  const supportSelection = useSelection(supportIds);
  const [details,setDetails]=useState()
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState(10);
 


  const getDetails = async () => {
    try {
      let object = {
        page: page,
        limit: rowsPerPage,
        search: search,
      };

      const payload = new URLSearchParams(object).toString();
      const response = await services.support.GET_SUPPORT(payload);
      setDetails(response?.data?.data?.rows);
      setTotalCount(response?.data?.data?.rows?.length);
    } catch (err) {
      console.error(err);
    }
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
    setSearch(inputValue)
    getDetails()
  };


  useEffect(() => {
    getDetails();
  }, []);

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
            <SupportSearch  onInputChange={handleInputChange}/>
            <SupportTable
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

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
