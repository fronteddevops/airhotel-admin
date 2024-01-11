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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

export const Vendorcard = (props) => {
  const { vendors, setVendors } = props;
  const [isDeleteVendorDialogOpen, setDeleteVendorDialogOpen] = useState(false);
  const [deletedVendorId, setDeletedVendorId] = useState(null);
  const [isAddVendorDialogOpen, setAddVendorDialogOpen] = useState(false);
  const [isEditVendorDialogOpen, setEditVendorDialogOpen] = useState(false);
  const [editedVendorId, setEditedVendorId] = useState(null);

  const [newVendor, setNewVendor] = useState({
    name: "",
    email: "",
    address: {
      city: "",
    },
    phone: "",
    website: "",
  });

  const handleOpenAddVendorDialog = () => {
    setAddVendorDialogOpen(true);
    setEditedVendorId(null);
  };

  const handleCloseAddVendorDialog = () => {
    setAddVendorDialogOpen(false);
    setNewVendor({
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      website: "",
    });
  };

  const handleOpenEditVendorDialog = (vendorId) => {
    setEditVendorDialogOpen(true);
    setEditedVendorId(vendorId);

    const selectedVendor = vendors.find((vendor) => vendor.id === vendorId);
    if (selectedVendor) {
      setNewVendor(selectedVendor);
    }
  };

  const handleCloseEditVendorDialog = () => {
    setEditVendorDialogOpen(false);
    setEditedVendorId(null);
    setNewVendor({
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      website: "",
    });
  };

  const handleAddVendor = () => {
    console.log("Adding new vendor:", newVendor);
    setVendors((prevVendors) => [...prevVendors, newVendor]);
    setNewVendor({
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      website: "",
    });
    setAddVendorDialogOpen(false);
  };

  const handleUpdateVendor = () => {
    console.log("Updating vendor:", newVendor);
  
    // Find the index of the edited vendor in the array
    const index = vendors.findIndex((vendor) => vendor.id === editedVendorId);
  
    if (index !== -1) {
      // Create a new array with the updated vendor
      const updatedVendors = [...vendors];
      updatedVendors[index] = newVendor;
  
      // Update the state with the new array of vendors
      setVendors(updatedVendors);
    }
  
    setNewVendor({
      name: "",
      email: "",
      address: {
        city: "",
      },
      phone: "",
      website: "",
    });
  
    setEditVendorDialogOpen(false);
    setEditedVendorId(null);
  };
  
  const handleInputChange = (field, value) => {
    setNewVendor((prevVendor) => ({
      ...prevVendor,
      [field]: value,
    }));
  };

  const handleOpenDeleteVendorDialog = (vendorId) => {
    setDeleteVendorDialogOpen(true);
    setDeletedVendorId(vendorId);
  };

  const handleCloseDeleteVendorDialog = () => {
    setDeleteVendorDialogOpen(false);
    setDeletedVendorId(null);
  };

  const handleDeleteVendor = () => {
    console.log("Deleting vendor with ID:", deletedVendorId);

    setVendors((prevVendors) =>
      prevVendors.filter((vendor) => vendor.id !== deletedVendorId)
    );

    setDeleteVendorDialogOpen(false);
    setDeletedVendorId(null);
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
          <Typography variant="h6">Vendor List</Typography>
          <Button variant="contained" onClick={handleOpenAddVendorDialog}
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
                <TableCell>Vendor Name</TableCell>
                <TableCell>Contact Information</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors &&
                vendors.map((vendor) => (
                  <TableRow hover key={vendor.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{vendor.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{vendor.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {vendor?.address?.city}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{vendor.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{vendor.website}</Typography>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpenEditVendorDialog(vendor.id)}>
                      <EditIcon/>
                      </Button>
                      <Button onClick={() => handleOpenDeleteVendorDialog(vendor.id)}>
                      <DeleteIcon/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* Add Vendor Dialog */}
      <Dialog open={isAddVendorDialogOpen} onClose={handleCloseAddVendorDialog}>
        <DialogTitle>Add Vendor</DialogTitle>
        <DialogContent>
          <TextField
            label="Vendor Name"
            value={newVendor.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={newVendor.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            fullWidth
          />
          <TextField
            label="City"
            value={newVendor.address.city}
            onChange={(e) => handleInputChange("address", { city: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone"
            value={newVendor.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            fullWidth
          />
          <TextField
            label="Website"
            value={newVendor.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddVendorDialog}>Cancel</Button>
          <Button onClick={handleAddVendor} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Vendor Dialog */}
      <Dialog open={isEditVendorDialogOpen} onClose={handleCloseEditVendorDialog}>
        <DialogTitle>Edit Vendor</DialogTitle>
        <DialogContent>
          <TextField
            label="Vendor Name"
            value={newVendor.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={newVendor.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            fullWidth
          />
          <TextField
            label="City"
            value={newVendor.address.city}
            onChange={(e) => handleInputChange("address", { city: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone"
            value={newVendor.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            fullWidth
          />
          <TextField
            label="Website"
            value={newVendor.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditVendorDialog}>Cancel</Button>
          <Button onClick={handleUpdateVendor} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Vendor Dialog */}
      <Dialog open={isDeleteVendorDialogOpen} onClose={handleCloseDeleteVendorDialog}>
        <DialogTitle>Delete Vendor</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this vendor?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteVendorDialog}>Cancel</Button>
          <Button onClick={handleDeleteVendor} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

Vendorcard.propTypes = {
  vendors: PropTypes.array.isRequired,
  setVendors: PropTypes.func.isRequired,
};

export default Vendorcard;
