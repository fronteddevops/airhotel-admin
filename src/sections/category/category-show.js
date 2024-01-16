/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import { format } from "date-fns";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { FaEdit } from "react-icons/fa";

export const CategoryCard = (props) => {
  const router = useRouter()
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

 const handleEdit = ()=>{
  router.push("/categoryedit")
 }

  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform delete action using selectedCategoryId
    console.log("Deleting category with ID:", selectedCategoryId);

    // Close the confirmation dialog
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
                <TableCell style={{textAlign:"center"}}>S.No.</TableCell>
                <TableCell style={{textAlign:"center"}}>Image</TableCell>
                <TableCell style={{textAlign:"center"}}>Category</TableCell>
                <TableCell style={{textAlign:"center"}}>Status</TableCell>
                <TableCell style={{textAlign:"center"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((category, i) => {
                const isSelected = selected.includes(category.id);
                console.log(typeof category?.status);
                return (
                  // eslint-disable-next-line react/jsx-max-props-per-line
                  <TableRow hover key={category.id} selected={isSelected}>
                    <TableCell style={{textAlign:"center"}}>{i + 1}</TableCell>
                    <TableCell  style={{textAlign:"center",marginLeft:"30px"}} >
                     
                        <img  src={category.logo} style={{height:"60px"}}></img>
                     
                    </TableCell>
                    <TableCell style={{textAlign:"center"}}>{category.title}</TableCell>
                    <TableCell style={{textAlign:"center"}}>
                      <Switch
                        // checked={category?.status}
                        // onChange={handleChange}
                        color="primary"
                        inputProps={{ "aria-label": "toggle button" }}
                      />
                    </TableCell>
                    <TableCell style={{textAlign:"center"}} >
                      <Typography  style={{ color: "#6366F1" }}  > <FaEdit style={{fontSize:"20px"}} onClick={handleEdit}/>  <DeleteIcon onClick={() => handleDeleteClick(category.id)} /></Typography>
                    
                </TableCell>
               
                      {/* <DeleteIcon sx={{ fontSize: "20px",marginTop:"10px" }}/> */}
                  
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
CategoryCard.propTypes = {
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














