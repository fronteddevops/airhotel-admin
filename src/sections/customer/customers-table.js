/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useEffect, useState } from "react";
import axios from "axios";
import services from "src/services";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

export const CustomersTable = (props) => {
 const { items = [] } = props;
  return (
    <Card>
      
    <Scrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 4,
        }}
      >
        <Typography variant="h6">User List</Typography>
        {/* <Button variant="contained"
        //  onClick={handleOpenAddVendorDialog}

                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
               
              >
          Add 
        </Button> */}
      </Box>
      <Box sx={{ minWidth: 800 }}>
      <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.map((customer) => {
                  return (
                    <TableRow hover key={customer.id}>
                      <TableCell>
                        <Typography variant="subtitle2">{customer.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{customer.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{customer?.address?.city}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{customer.phone}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{customer.website}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
      </Box>
    </Scrollbar>

  </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
