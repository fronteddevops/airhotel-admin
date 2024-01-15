/* eslint-disable react/jsx-max-props-per-line */

import React, { useState } from "react";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  SvgIcon,
  TablePagination,
  Switch,
  TableContainer,
  Avatar,
  Stack,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import "@fortawesome/fontawesome-free/css/all.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";

export const PaymentTable = (props) => {

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const router=useRouter()
  const handleDetails = (id) => {
    router.push({
        pathname: '/viewbookingdetails',
        query: { id },
      });
    
  };



  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center" }}>User ID</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" ,textAlign:"center" }}>First Name</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center"  }}>Last Name</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Phone Number</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Email</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Payment Id</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Booking Id</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Amount</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Payment Status</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Created At</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((payment, i) => {
               let textColor
                if (payment.status === 'Paid') {
                  textColor = 'green';
                } else if (payment.status === 'Failed') {
                  textColor = 'red';
                } else {
                 
                }
                const isSelected = selected.includes(payment.id);

                return (
                  <TableRow hover key={payment.id} selected={isSelected}>
                    <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>{payment.firstName}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{payment.lastName}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{payment.phoneNumber}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{payment.email}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{payment.paymentId}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{payment.orderId}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{payment.amount}</TableCell>
                    
                    <TableCell sx={{ textAlign: "center" ,color: textColor }}>{payment.status}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{payment.createdAt}</TableCell>

                    
                  
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
     
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PaymentTable.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

export default PaymentTable;
