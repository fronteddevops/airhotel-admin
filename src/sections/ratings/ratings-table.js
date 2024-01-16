/* eslint-disable react/jsx-max-props-per-line */

import React, { useState } from "react";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ReactStars from "react-rating-stars-component";
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
import { yellow } from "@mui/material/colors";

export const RatingsTable = (props) => {

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
                <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center"  }}>Booking Id</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Review</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"start"  }}>Ratings</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign:"center" }}>Status</TableCell>

               
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((rate, i) => {
               let textColor
                if (rate.status === 'Confirmed') {
                  textColor = 'green';
                } else if (rate.status === 'Pending') {
                  textColor = 'red';
                } else {
                 
                }
                const isSelected = selected.includes(rate.id);

                return (
                  <TableRow hover key={rate.id} selected={isSelected}>
                    <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>{rate.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{rate.bookingId}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{rate.review}</TableCell>
                    <TableCell sx={{ textAlign: "center",fontSize:0}}>
                      {/* {rate.ratings} */}
                      <ReactStars
                     
                              value={rate.ratings}
                              count={5}
                              size={20}
                              activeColor="#ffd700"
                              color={yellow}
                              isHalf={true} // Disable half ratings
                              edit={false} // Disable user rating changes
                            />
                      
                      </TableCell>
                  
                    <TableCell sx={{ textAlign: "center" ,color: textColor }}>{rate.status}</TableCell>

                    
                  
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

RatingsTable.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

export default RatingsTable;
