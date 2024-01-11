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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 4,
          }}
        >
          <Typography variant="h6">Hotel List</Typography>
          <Button variant="contained" onClick={handleOpenAddDialog}
          
          startIcon={(
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          )}
          >
            
            Add 
          </Button>
        </Box>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hotel Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((hotel) => (
                  <TableRow hover key={hotel.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{hotel.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{hotel.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {hotel?.address?.city}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{hotel.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{hotel.website}</Typography>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpenEditDialog(hotel.id)}>
                      <EditIcon/>
                      </Button>
                      <Button onClick={() => handleOpenDeleteDialog(hotel.id)}>
                      <DeleteIcon/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* Add Hotel Dialog */}
      <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Hotel</DialogTitle>
        <DialogContent>
          <TextField
            label="Hotel Name"
            value={newHotel.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={newHotel.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            fullWidth
          />
          <TextField
            label="City"
            value={newHotel.address.city}
            onChange={(e) => handleInputChange("address", { city: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone"
            value={newHotel.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            fullWidth
          />
          <TextField
            label="Website"
            value={newHotel.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Hotel Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Hotel</DialogTitle>
        <DialogContent>
          <TextField
            label="Hotel Name"
            value={newHotel.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={newHotel.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            fullWidth
          />
          <TextField
            label="City"
            value={newHotel.address.city}
            onChange={(e) => handleInputChange("address", { city: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone"
            value={newHotel.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            fullWidth
          />
          <TextField
            label="Website"
            value={newHotel.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Hotel Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Hotel</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this Hotel?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

Hotelcard.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
};

export default Hotelcard;
