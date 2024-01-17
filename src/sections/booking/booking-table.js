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

export const BookingTable = (props) => {

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
                <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center" }}>ID</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" ,textAlign:"center" }}>Name</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center"  }}>Room Id</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Payment Type</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Amount</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Status</TableCell>

                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((booking, i) => {
               let textColor
                if (booking.status === 'Confirmed') {
                  textColor = 'green';
                } else if (booking.status === 'Pending') {
                  textColor = 'red';
                } else {
                 
                }
                const isSelected = selected.includes(booking.id);
              const id=booking.id
                return (
                  <TableRow hover key={booking.id} selected={isSelected}>
                    <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>

                   
                    <TableCell sx={{ textAlign: "center" }}>{booking.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{booking.roomId}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{booking.paymentType}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{booking.amount}</TableCell>
                    <TableCell sx={{ textAlign: "center" ,color: textColor }}>{booking.status}</TableCell>

                    
                    <TableCell sx={{ textAlign: "center" }} onClick={()=>{
                        handleDetails(id)
                    }}>
                        <RemoveRedEyeIcon  style={{ color: "#6366F1" }} />
                      </TableCell>
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

BookingTable.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

export default BookingTable;
