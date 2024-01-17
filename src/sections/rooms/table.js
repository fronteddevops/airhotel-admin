/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import { format } from "date-fns";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useRouter } from "next/router";
import { FaEdit } from "react-icons/fa";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
export const RoomsTable = (props) => {
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
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
  const handleEdit = () => {
    router.push("/roomsedit");
  };

  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
   
    console.log("Deleting category with ID:", selectedCategoryId);

    
    setConfirmationDialogOpen(false);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  } 
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>S.No.</TableCell>
                <TableCell sx={{  whiteSpace: "nowrap",textAlign: "center" }}>Hotel Name</TableCell>
                <TableCell sx={{  whiteSpace: "nowrap",textAlign: "center" }}>Room Images</TableCell>
                <TableCell sx={{  whiteSpace: "nowrap",textAlign: "center" }}>Room Type</TableCell>
                <TableCell sx={{  whiteSpace: "nowrap",textAlign: "center" }}>Extra Mattress</TableCell>
    
                <TableCell sx={{  whiteSpace: "nowrap",textAlign: "center" }}>Room Price</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>AC Or Non-AC</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>Number Of Guest</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>Number Of Children</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>Amenities</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>Status </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>IsActive </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((room, i) => {
                const isSelected = selected.includes(room.id);
                console.log(typeof room?.status);
                return (
                  <TableRow hover key={room.id} selected={isSelected}>
                    <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>{room.hotelName}</TableCell>
                    <TableCell  style={{textAlign:"center",marginLeft:"30px"}} >
                     
                        <img  src={room.roomImages} style={{height:"60px"}}></img>
                     
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{room.roomType}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{room.extraMattress}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{room.roomPrice}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{room.acornonac}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{room.numberOfGuest}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{room.numberOfChildren}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{room.amenities}</TableCell>
                   
                    <TableCell sx={{ textAlign: "center" }}>{room.status}</TableCell>
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
                        <DeleteIcon  style={{ color: "#6366F1" }} onClick={() => handleDeleteClick(room.id)}/>
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
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
            {/* ... Delete Confirmation ... */}
            <Dialog
        open={isConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete the category?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
RoomsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
