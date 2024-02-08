/* eslint-disable react/jsx-max-props-per-line */
import PropTypes from "prop-types";
import { format } from "date-fns";

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
  SvgIcon,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import services from "src/services";
import { toggleUser } from "src/redux/action";
import Toaster from "../../components/toaster"


export const CustomersTable = (props) => {
  const router = useRouter();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [toggle, setToggle] = useState();
  const [toaster, setToaster] = useState({ visiblity: "hide" });

 
  const handleDetails = (id) => {
    router.push({
      pathname:"/userviewdetails",
      query: { id },
    });
  };
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
    rowsPerPage = 10,  // Set default value to 10
    selected = [],
    update = () => {},
  } = props;


  const getDetails = async () => {
    try {
      const response = await services.userList.GET_USERS();
      setToggle(response.data.isActive);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = async (id, isverify) => {
    dispatch(toggleUser(id, isverify));
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
              <TableRow>
              <TableCell sx={{ whiteSpace: "nowrap",textAlign:"center" }}>S.No</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "20px" }}>ID</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>User Name</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Email</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Phone</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Date of Birth</TableCell>
                {/* <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>
                  Verification Status
                </TableCell> */}
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Is Active</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(items) && items.length > 0 ? (
                items.map((user,i) => (
                  <TableRow hover key={user.id}>

<TableCell style={{ textAlign: "center" }}>{i + 1}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {user.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {user.email}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {user.contact}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {moment(user.Dob).format("MMMM D, YYYY")}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: "center",
                          color: user.isVerify === false ? "red" : "green",
                        }}
                      >
                        {user.isVerify === false ? "InActive" : "Active"}
                      </Typography>
                    </TableCell> */}

                    <TableCell sx={{ textAlign: "center" }}>
                      <Switch
                        checked={user?.isVerify}
                        onChange={(e) =>{
                          handleToggle(user.id,user?.isVerify)
                        }}
                        // onChange={handleSwitchChange}
                        color="primary"
                        inputProps={{ "aria-label": "toggle button" }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}
                    onClick={(e) => handleDetails(user?.id)}>
                      <RemoveRedEyeIcon style={{ color: "#6366F1" }} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                      No users found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
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


CustomersTable.propTypes = {
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
};
