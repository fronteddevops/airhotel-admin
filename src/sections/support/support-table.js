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
  Menu,
  MenuItem,
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
export const SupportTable = (props) => {
    
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
                <TableCell sx={{ textAlign: "center" }}>Title</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Subject</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((support, i) => {
                const isSelected = selected.includes(support.id);
              
                return (
                  <TableRow hover key={support.id} selected={isSelected}>
                    <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>{support.title}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{support.subject}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{support.status}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <div>
                        <Typography
                          sx={{ marginLeft: "10px", fontSize: "20px" }}
                          onClick={handleIconClick}
                        >
                          <FaEdit style={{ color: "#6366F1" }} />
                        </Typography>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                          <MenuItem onClick={handleClose}>In Progress</MenuItem>
                          <MenuItem onClick={handleClose}>Completed</MenuItem>
                        </Menu>
                      </div>
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
SupportTable.propTypes = {
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
