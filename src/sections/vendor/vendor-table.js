// Vendorcard.js

import React, { useState } from "react";
import PropTypes from "prop-types";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Toaster from "../../components/toaster"
import moment from "moment";
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
  Avatar,
  Switch,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
// import { toggleVendor } from "src/redux/actions"; 
import {  toggleVendor} from '../../redux/action/index';
import { Scrollbar } from "src/components/scrollbar";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Stack } from "@mui/system";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import services from "src/services";
export const Vendorcard = (props) => {
  const { vendors, setVendors } = props;
  const router = useRouter()
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

  const [isSwitchOn, setSwitchOn] = useState(false);
  const [toggle, setToggle] = useState();
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const vendor = useSelector(state => state.vendors);

  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const handleSwitchChange = (customerId) => {
    // setSelectedCustomerId(customerId);

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
      pathname: "/venderedit",
      query: { id },
    });
    // router.push("/venderedit")
  }



  const getDetails = async () => {
    try {
      let object = {
        page: page,
        limit: rowsPerPage,
        search: '',
      };

      const payload = new URLSearchParams(object).toString();
      const response = await services.userList.GET_USERS(payload);
      const vendorData = response?.data?.data?.rows?.filter(item => item?.role.toLowerCase() === 'vendor');
      setToggle(response.data.isActive);
// setVandorData(vendorData)
//       setTotalCount(vendorData?.length);
//       setData(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };



   const handleToggle = async (id, isverify) => {
    dispatch(toggleVendor(id, isverify));
    try {
      const data = {
        isVerify: isverify===false?true:false
    };
      const response = await services.vendor.UPDATE_VENDOR(id, data);
      if (response) {
        // getDetails();
        update("update")
        setToaster({
          type: "success",
          title: "Successful",
          text: "Vendor Updated successfully",
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
    <div><Toaster
    type={toaster.type}
    title={toaster.title}
    text={toaster.text}
    visiblity={toaster.visiblity}
  />
  
  <Card>
    <Scrollbar>
      <TableContainer sx={{ minWidth: 800, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow >
            {/* <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>
            S.No
              </TableCell> */}
              <TableCell sx={{ whiteSpace: "nowrap", padding: "20px" }}>ID</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>User Name</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Email</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Phone</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Date of Birth</TableCell>
            
              <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Is Active</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors &&
              vendors.map((customer,i) => {
                return (
                  <TableRow hover key={customer.id}>
{/* <TableCell style={{ textAlign: "center" }}>{i + 1}</TableCell> */}

                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                      {customer.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                      {customer.firstName ? customer.firstName.substring(0, 15) : "-"}&nbsp;&nbsp;
                      {customer.lastName ? customer.lastName.substring(0, 15) : "-"}

                        {/* {customer.firstName} &nbsp; {customer.lastName} */}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {customer.email}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {customer.contact}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                      {moment(customer.Dob).format(
                            "MMM DD, YYYY hh:mm A"
                          )}
                       {/* {customer.Dob} */}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>
                      <Typography
                        variant="subtitle2"
                        sx={{ textAlign: "center", color: "green" }}
                      >
                        Active
                      </Typography>
                    </TableCell> */}
                    <TableCell sx={{ textAlign: "center" }}>
                      <Switch
                        checked={customer.isVerify}
                        onChange={() =>{

                          handleToggle(customer.id,customer?.isVerify)
                        
                        }}
                        // onChange={(e) =>{
                        //   const isverify=customer.isVerify
                        //   handleToggle(customer.id,!customer.isVerify)
                        
                        // }}
                        color="primary"
                        inputProps={{ "aria-label": "toggle button" }}
                      />
                    </TableCell>
                    <TableCell  sx={{marginLeft:"10px",fontSize:"20px",textAlign:"center",}} >
             
                    <FaEdit  style={{ color: "#6366F1" ,cursor:"pointer"}} 
                    
                    onClick={(e) => handleEdit(customer?.id)}
                   />
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
     {/* <TablePagination
      component="div"
      count={count}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25]}
    /> */}
  </Card></div>
  
  );
};

Vendorcard.propTypes = {
  vendors: PropTypes.array.isRequired,
  setVendors: PropTypes.func.isRequired,
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

export default Vendorcard;
