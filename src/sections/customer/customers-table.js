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

export const CustomersTable = (props) => {
  const router = useRouter();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleDetails = () => {
    router.push("/userviewdetails");
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
    rowsPerPage = 0,
    selected = [],
  } = props;

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
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "20px" }}>ID</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>User Name</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Email</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Phone</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Date of Birth</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>
                  Verification Status
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap", padding: "50px" }}>Is Active</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(items) && items.length > 0 ? (
                items.map((customer) => (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {customer.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {customer.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {customer.email}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        {customer.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                        4/5/2024
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ textAlign: "center", color: "green" }}>
                        Active
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Switch
                        checked={customer?.status}
                        onChange={handleSwitchChange}
                        color="primary"
                        inputProps={{ "aria-label": "toggle button" }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }} onClick={handleDetails}>
                      <RemoveRedEyeIcon style={{ color: "#6366F1" }}  />
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
};
