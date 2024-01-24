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

export const HotelCard = (props) => {

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

  const handleEdit =()=>{
    router.push("/hoteledit")
  }

  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center" }}>S.No</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" ,textAlign:"center" }}>Hotel Name</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center"  }}>Images</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Address</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>City</TableCell>
                {/* <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>State/Province</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap",  textAlign:"center" }}>Country</TableCell> */}
                <TableCell sx={{ whiteSpace: "nowrap",  textAlign:"center" }}>Reviews</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Room Id</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Room Type</TableCell>
                
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Amenities</TableCell>
               
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>
                  Price
                </TableCell>
               
               
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Is Active</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((hotel, i) => {
                const isSelected = selected.includes(hotel.id);
                console.log(typeof hotel?.status);
                return (
                  <TableRow hover key={hotel.id} selected={isSelected}>
                    <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>{hotel.name}</TableCell>
                    <TableCell  style={{textAlign:"center",marginLeft:"30px"}} >
                     
                     <img  src={hotel.image} style={{height:"60px"}}></img>
                  
                 </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.location}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.city}</TableCell>
                    {/* <TableCell sx={{ textAlign: "center" }}>{hotel.stateProvince}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.country}</TableCell> */}
                    <TableCell sx={{ textAlign: "center" }}>{hotel.reviews}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.roomId}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.roomType}</TableCell>
                  
                    <TableCell sx={{ textAlign: "center" }}>{hotel.amenities}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.price}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Switch
                        // checked={category?.status}
                        // onChange={handleChange}
                        color="primary"
                        inputProps={{ "aria-label": "toggle button" }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography sx={{ marginLeft: "10px" ,fontSize:"20px"}}>
                        {" "}
                        <FaEdit  style={{ color: "#6366F1" }}  onClick={handleEdit}/>
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

HotelCard.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

export default HotelCard;
