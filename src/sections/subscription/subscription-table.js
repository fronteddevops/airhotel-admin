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
  Card,
  Checkbox,
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
export const SubscriptionCard = (props) => {
  const router = useRouter();
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
    router.push("/subscriptionedit");
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>S.No.</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Plan Name</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Date</TableCell>
                <TableCell sx={{ textAlign: "center" }}>No. of products</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Currency Type</TableCell>
                <TableCell sx={{ textAlign: "center" }}>IsActive </TableCell>
                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((sub, i) => {
                const isSelected = selected.includes(sub.id);
           
                return (
                  <TableRow hover key={sub.id} selected={isSelected}>
                    <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>{sub.planName}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{sub.date}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{sub.numberOfProducts}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{sub.price}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{sub.currencyType}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Switch
                        // checked={category?.status}
                        // onChange={handleChange}
                        color="primary"
                        inputProps={{ "aria-label": "toggle button" }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography sx={{ marginLeft: "10px" ,fontSize:"20px"}} >
                        {" "}
                        <FaEdit  style={{ color: "#6366F1" }} onClick={handleEdit}/>
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
    </Card>
  );
};
SubscriptionCard.propTypes = {
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
