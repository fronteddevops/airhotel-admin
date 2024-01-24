/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import { format } from "date-fns";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Toaster from "../../components/toaster";
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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { FaEdit } from "react-icons/fa";
import services from "src/services";


export const CategoryCard = (props) => {
  const router = useRouter();
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [toggle, setToggle] = useState();
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

  const handleEdit = (id) => {

    console.log("calal")
    router.push({
      pathname: '/categoryedit',
      query: { id },
    });
  };

  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = async() => {
    try{
      const data={
        status:false
      }
      const response = await services.category.DELETE_CATEGORY(selectedCategoryId,data)
      if(response)
      {
        setToaster({
          type: "success",
          title: "Successful",
          text: "Delete Category successfully",
          visiblity: "show",
        });
        setTimeout(() => {
      
          window.location.reload()
      
      }, 1500);
      }
    } catch (error) {
     
      setToaster({
        type: "danger",
        title: "Error Occured",
        text: error.response.data.message,
        visiblity: "show",
      });
      setTimeout(() => {
      
          window.location.reload()
      
      }, 1500);
    }
    setConfirmationDialogOpen(false);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleChange = async (id, status) => {
   
    try {
      const data = {
        isActive: status,
      };

      const response = await services.category.UPDATE_CATEGORY(id, data);
      if(response){
        
        setToaster({
          type: "success",
          title: "Successful",
          text: "Update Category successfully",
          visiblity: "show",
        });
        setTimeout(() => {
          window.location.reload()
        }, 1000);
        
      }
    } catch (error) {
     
      setToaster({
        type: "danger",
        title: "Error Occured",
        text: error.response.data.message,
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
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>S.No.</TableCell>
                <TableCell style={{ textAlign: "center" }}>Image</TableCell>
                <TableCell style={{ textAlign: "center" }}>Category</TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                Array.isArray(items) &&
                items.map((category, i) => {
                  const isSelected = selected.includes(category.id);

                  return (
                    // eslint-disable-next-line react/jsx-max-props-per-line
                    <TableRow hover key={category?.id} selected={isSelected}>
                      <TableCell style={{ textAlign: "center" }}>{i + 1}</TableCell>
                      <TableCell style={{ textAlign: "center", marginLeft: "30px" }}>
                        <img src={category?.image} style={{ height: "60px" }}></img>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>{category?.name}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Switch
                          checked={category?.isActive}
                          onChange={() => handleChange(category?.id, category?.isActive===true ? false :true)}
                          color="primary"
                          inputProps={{ "aria-label": "toggle button" }}
                        />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Typography style={{ color: "#6366F1" }}>
                          {" "}
                          <FaEdit style={{ fontSize: "20px" }} onClick={()=>handleEdit(category?.id)} />{" "}
                          <DeleteIcon onClick={() => handleDeleteClick(category?.id)} />
                        </Typography>
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
      <Dialog open={isConfirmationDialogOpen} onClose={handleCloseConfirmationDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete the category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    </div>
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
