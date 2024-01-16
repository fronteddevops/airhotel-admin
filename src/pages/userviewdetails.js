/* eslint-disable react/jsx-max-props-per-line */
import {
    Box,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
    TextField,
    Button,
    Divider,
    CardActions,
    CardHeader,
    Card,
    CardContent,
  } from "@mui/material";
  import * as React from 'react';

  import Tab from '@mui/material/Tab';
  import TabContext from '@mui/lab/TabContext';
  import TabList from '@mui/lab/TabList';
  import TabPanel from '@mui/lab/TabPanel';
  
  import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AddressDetails } from "src/sections/customer/address-details";
import { UserDetails } from "src/sections/customer/user-details";
  const Page = (props) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' ,p:5}}>
        <AddressDetails/>
        <br></br>
        <br></br>
        <UserDetails/>
     
    </Box>
      
    );
  };
  Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  export default Page;
  