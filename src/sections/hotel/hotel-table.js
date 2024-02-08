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
import Toaster from "../../components/toaster";
import moment from "moment";
import services from "src/services";
import { useDispatch, useSelector } from 'react-redux';
import {  toggleHotel} from '../../redux/action/index';

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
    update = () => {},
    rowsPerPage = 0,
    selected = [],
  } = props;

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const dispatch = useDispatch();
  const vendor = useSelector(state => state.vendors);
  const router=useRouter() // Set to 10 rows per page
  const [search, setSearch] = useState('');


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

  const handleEdit =(id)=>{
   
    router.push({
      pathname: '/hoteledit',
      query: { id },
    });
  }

  const handleDetails = (id) => {
    router.push({
      pathname:"/hotelviewdetails",
      query: { id },
    });
  };



  const getDetails = async () => {
    try {
      let object = {
        page: page,
        limit: rowsPerPage,
        search: search,
      };

      const payload = new URLSearchParams(object).toString();
      const response = await services.hotel.GET_HOTEL(payload);
      
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id, status) => {
    dispatch(toggleHotel(id, status));
    try {
      const data = {
        status: status===false?true:false
        
    };
    const response = await services.hotel.UPDATE_HOTEL(id, data);
      if (response) {
        // getDetails();
        update("update")
        setToaster({
          type: "success",
          title: "Successful",
          text: "Hotel Updated successfully",
          visiblity: "show",
        });

        setTimeout(() => {
          setToaster({
            visiblity: "hide",
          });
        }, 1000);
     
        
      }
    } catch (error) {
      console.log(error)
      setToaster({
        type: "error",
        title: "Error Occured",
        text: "Error",
        visiblity: "show",
      });
      setTimeout(() => {
        setToaster({
          visiblity: "hide",
        });
      }, 1500);
    }
  };

  return (
    <div>
    <Toaster
    type={toaster.type}
    title={toaster.title}
    text={toaster.text}
    visiblity={toaster.visiblity}
  />
    <Card>
      <Scrollbar>
        <TableContainer sx={{overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center" }}>S.No</TableCell>
                {/* <TableCell sx={{ whiteSpace: "nowrap" ,textAlign:"center" }}>Category</TableCell> */}
                <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center"  }}>Hotel Name</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Hotel Address</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>City</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>State/Province</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap",  textAlign:"center" }}>Country</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap",  textAlign:"center" }}>Pin Code</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Distance From Airport</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Distance From Center</TableCell>
                
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Location</TableCell>
               
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>
                  No. Of Room
                </TableCell>
               
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>
                  Starting Price
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>
                  Check In Time
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>
                  Check Out Time
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>
                  Facility
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>
                  Description
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Is Active</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center"  }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items && items?.map((hotel, i) => {
                const isSelected = selected.includes(hotel.id);
                
                return (
                  <TableRow hover key={hotel.id} selected={isSelected}>
                    <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>
                    {/* <TableCell sx={{ textAlign: "center" }}>{hotel?.Category?.name}</TableCell> */}
                    <TableCell sx={{ textAlign: "center" }}>{hotel.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.address}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.city}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.state}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.country}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.pincode}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.distanceFromAirport}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.distanceFromCenter}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.location}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.numberOfRoom}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{hotel.startingPrice}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {moment(hotel.checkInTime).format("MMMM D, YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {moment(hotel.checkOutTime).format("MMMM D, YYYY")}
                      </Typography>
                    </TableCell>
                 
                    <TableCell sx={{ textAlign: "center" }}>
                      {hotel.selectFacility}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {/* {hotel.description} */}
                    {hotel.description ? hotel.description.substring(0, 50) : "-"}...
                    </TableCell>
                  
                   
                    <TableCell sx={{ textAlign: "center" }}>
                      <Switch
                        checked={hotel?.status}
                        onChange={() => handleToggle(hotel?.id, hotel?.status)}
                        color="primary"
                        inputProps={{ "aria-label": "toggle button" }}
                      />
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }} 
                         onClick={(e) => handleDetails(hotel?.id)}
                    
                    >
                      <RemoveRedEyeIcon style={{ color: "#6366F1" }} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
    </div>
  );
};

HotelCard.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  update: PropTypes.number,
};

export default HotelCard;
