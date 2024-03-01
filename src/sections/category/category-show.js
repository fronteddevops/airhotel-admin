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
  FormLabel,
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
import constant from "src/constant";
import { useDispatch, useSelector } from 'react-redux';
import { toggleCategory } from '../../redux/action/index';

export const CategoryCard = (props) => {
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
    update = () => {},
    confirmDelete = () => {}
  } = props;
  const router = useRouter();
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [toggle, setToggle] = useState();
  const imageUrl = constant.BASE_URL_UPLOADS;
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  
  const handleEdit = (id) => {
    router.push({
      pathname: "/categoryedit",
      query: { id },
    });
  };

  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setConfirmationDialogOpen(true);
  };

  const getDetails = async () => {
    try {
      const response = await services.category.GET_CATEGORY();
      setToggle(response.data.isActive);
    } catch (err) {
      console.log(err);
    }
  };


  const handleConfirmDelete = async () => {
    try {
      const data = {
        status: false,
      };
      const response = await services.category.DELETE_CATEGORY(selectedCategoryId, data);
      if (response) {
        getDetails()
       confirmDelete("confirm")
        setToaster({
          type: "success",
          title: "Successful",
          text: "Delete Category successfully",
          visiblity: "show",
        });

        setTimeout(() => {
          setToaster({
            type: "success",
            title: "Successful",
            text: "Delete Category successfully",
            visiblity: "hide",
          });
        }, 1500);
      }
    } catch (error) {
      setToaster({
        type: "error",
        title: "Error Occured",
        text: "Error",
        visiblity: "show",
      });
      
    }
    setConfirmationDialogOpen(false);
  };


  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };
  const handleToggle = async (id, isActiveStatus) => {
    
    dispatch(toggleCategory(id, isActiveStatus));
    try {
      const data = {
     isActive : isActiveStatus
      }

      const response = await services.category.UPDATE_CATEGORY(id, data);
      if (response) {
        // getDetails();
        update("update")
        setToaster({
          type: "success",
          title: "Successful",
          text: "Category Updated successfully",
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
                    const images = category?.image;
                    return (
                      <TableRow hover key={category?.id} selected={isSelected}>
                        <TableCell style={{ textAlign: "center" }}>{i + 1}</TableCell>
                        <TableCell style={{ textAlign: "center", marginLeft: "30px" }}>
                          <img
                            crossOrigin="anonymous"
                            src={imageUrl + category?.image}
                            alt="CategoryImage"
                            style={{ borderRadius: "10px" }}
                            width={80}
                            height={80}
                          />
                          
                        
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>{category?.name}</TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          
                          <Switch
                            checked={category.isActive}
                            onChange={(e) =>{
                              handleToggle(category.id,!category?.isActive)
                            
                            }}
                          />

                        
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Typography style={{ color: "#6366F1" }}>
                            {" "}
                            <FaEdit
                              style={{ fontSize: "20px",cursor:"pointer" }}
                              onClick={(e) => handleEdit(category?.id)}
                            />{" "}
                            <DeleteIcon style={{cursor:"pointer"}} onClick={(e) => handleDeleteClick(category?.id)} />
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
        {/* <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
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
  update: PropTypes.number,
  confirmDelete: PropTypes.number
};
