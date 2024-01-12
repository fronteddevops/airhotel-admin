/* eslint-disable react/jsx-max-props-per-line */

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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

export const Hotelcard = (props) => {
  const { data, setData } = props;
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
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedId, setEditedId] = useState(null);

  const [newHotel, setNewHotel] = useState({
    name: "",
    email: "",
    address: {
      city: "",
    },
    phone: "",
    website: "",
  });

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
    setEditedId(null);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setNewHotel({
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      website: "",
    });
  };

  const handleOpenEditDialog = (Id) => {
    setEditDialogOpen(true);
    setEditedId(Id);

    const selected= data.find((data) => data.id === Id);
    if (selected) {
      setNewHotel(selected);
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditedId(null);
    setNewHotel({
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      website: "",
    });
  };

  const handleAdd = () => {
    console.log("Adding new Hotel:", newHotel);
    setData((prev) => [...prev, newHotel]);
    setNewHotel({
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      website: "",
    });
    setAddDialogOpen(false);
  };

  const handleUpdate = () => {
    console.log("Updating Hotel:", newHotel);

    const index = data.findIndex((data) => data.id === editedId);
  
    if (index !== -1) {
     
      const updated = [...data];
      updated[index] = newHotel;
  
     
      setData(updated);
    }
  
    setNewHotel({
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      website: "",
    });
  
    setEditDialogOpen(false);
    setEditedId(null);
  };
  
  const handleInputChange = (field, value) => {
    setNewHotel((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenDeleteDialog = (Id) => {
    setDeleteDialogOpen(true);
    setDeletedId(Id);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeletedId(null);
  };

  const handleDelete = () => {
    console.log("Deleting Hotel with ID:", deletedId);

    setData((prev) =>
      prev.filter((data) => data.id !== deletedId)
    );

    setDeleteDialogOpen(false);
    setDeletedId(null);
  };

  return (
    <Card>
    <Scrollbar>
         <Box sx={{ minWidth: 800 }}>
           <Table>
             <TableHead>
               <TableRow>
               <TableCell>S.No</TableCell>
               <TableCell>Hotel Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Phone</TableCell>
              
                <TableCell>Actions</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {data && data.map((hotel, i) => {
                 const isSelected = selected.includes(hotel.id);
                 console.log(typeof hotel?.status);
                 return (
                   // eslint-disable-next-line react/jsx-max-props-per-line
                   <TableRow hover key={hotel.id} selected={isSelected}>
                     <TableCell>{i + 1}</TableCell>
                   
                     <TableCell>{hotel.name}</TableCell>
                     <TableCell>{hotel.email}</TableCell>
                     <TableCell>{hotel?.address?.city}</TableCell>
                     <TableCell>{hotel.phone}</TableCell>
                     <TableCell>
                      <EditIcon />
                      <DeleteIcon/>
                    </TableCell>
                     {/* <TableCell>
                       <Switch
                         checked={vendor?.status}
                         onChange={handleChange}
                         color="primary"
                         inputProps={{ "aria-label": "toggle button" }}
                       />
                     </TableCell> */}
                     
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

Hotelcard.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

export default Hotelcard;
