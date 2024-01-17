/* eslint-disable react/jsx-max-props-per-line */

import React, { useState } from "react";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

export const CouponTable = (props) => {

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
  const [selectedId, setSelectedId] = useState(null);
  const router=useRouter()

  const handleSwitchChange = (customerId) => {
    setSelectedCustomerId(customerId);

    setSwitchOn(!isSwitchOn);

    handleOpenConfirmationDialog();
  };

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmationDialogOpen(true);
  };
  const handleEdit =()=>{
    router.push("/couponedit")
  }

  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
               
                <TableCell sx={{ whiteSpace: "nowrap" ,textAlign:"center" }}>S.No</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center"  }}>Coupon Code</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Discount</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Description</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Created At</TableCell>
                
               
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Is Active</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((coupon, i) => {
                const isSelected = selected.includes(coupon.id);
                
                return (
                  <TableRow hover key={coupon.id} selected={isSelected}>
                    <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>{coupon.couponCode}</TableCell>
                  
                    <TableCell sx={{ textAlign: "center" }}>{coupon.discount}%</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{coupon.description}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{coupon.createdAt}</TableCell>
                
                   
                    <TableCell sx={{ textAlign: "center" }}>
                      <Switch
                      
                        color="primary"
                        inputProps={{ "aria-label": "toggle button" }}
                      />
                    </TableCell>
                   <TableCell sx={{ textAlign: "center" }}>
                      <Typography sx={{ marginLeft: "10px" ,fontSize:"20px"}}
                   
                       >
                      
                        <FaEdit  style={{ color: "#6366F1" }}  onClick={handleEdit}/>
                        <DeleteIcon  style={{ color: "#6366F1" }} onClick={() => handleDeleteClick(coupon.id)}/>
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Confirmation Active InActive */}
        <Dialog open={isConfirmationDialogOpen} onClose={handleCloseConfirmationDialog}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Are you sure you want to toggle the switch?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmationDialog}>Cancel</Button>
            <Button
              onClick={() => {
                handleCloseConfirmationDialog();
              }}
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
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

CouponTable.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

export default CouponTable;
