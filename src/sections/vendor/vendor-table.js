// Vendorcard.js

import React, { useState } from "react";
import PropTypes from "prop-types";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
  Avatar,
  Switch,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Stack } from "@mui/system";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
export const Vendorcard = (props) => {
  const { vendors, setVendors } = props;
  const router = useRouter()
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
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleSwitchChange = (customerId) => {
    // setSelectedCustomerId(customerId);

    setSwitchOn(!isSwitchOn);

    handleOpenConfirmationDialog();
  };

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };
  const handleEdit =()=>{
    router.push("/venderedit")
  }
  return (
    <Card>
    <Scrollbar>
      <TableContainer sx={{ minWidth: 800, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{ whiteSpace: "nowrap", padding: "20px" }}>ID</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>User Name</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Email</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Phone</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Date of Birth</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>
                Verification Status
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Is Active</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors &&
              vendors.map((customer) => {
                return (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        1
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {customer.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {customer.email}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {customer.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        4/5/2024
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        sx={{ textAlign: "center", color: "green" }}
                      >
                        Active
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Switch
                        checked={customer?.status}
                        onChange={handleSwitchChange}
                        color="primary"
                        inputProps={{ "aria-label": "toggle button" }}
                      />
                    </TableCell>
                    <TableCell  sx={{marginLeft:"10px",fontSize:"20px",textAlign:"center"}} onClick={handleEdit}>
             
                    <FaEdit  style={{ color: "#6366F1" }}/>
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

Vendorcard.propTypes = {
  vendors: PropTypes.array.isRequired,
  setVendors: PropTypes.func.isRequired,
};

export default Vendorcard;
