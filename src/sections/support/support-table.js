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
import { toggleSupport } from "../../redux/action/index";
import { useDispatch, useSelector } from "react-redux";
import services from "src/services";
import Toaster from "src/components/toaster";

export const SupportTable = (props) => {
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
  } = props;

  const handleEdit = () => {
    router.push("/subscriptionedit");
  };
  const dispatch = useDispatch();
  const support = useSelector((state) => state.support);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userId, setUserId] = useState(null);

  const [toaster, setToaster] = useState({ visiblity: "hide" });

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleComplete = async (isActive) => {
    dispatch(toggleSupport(userId, isActive));
    try {
      const data = {
        isActive: true,
      };
      const response = await services.support.UPDATE_SUPPORT_BY_ID(userId, data);
      if (response) {
        update("update");
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
      console.log(error);
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

    setAnchorEl(null);
  };

  const handleInProgress = async (isActive) => {
    dispatch(toggleSupport(userId, isActive));
    try {
      const data = {
        isActive: false,
      };
      const response = await services.support.UPDATE_SUPPORT_BY_ID(userId, data);
      if (response) {
        update("update");
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
      console.log(error);
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

    setAnchorEl(null);
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
                  <TableCell sx={{ whiteSpace: "nowrap", padding: "50px",textAlign: "center" }}>ID</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", padding: "50px",textAlign: "center" }}>UserName</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", padding: "50px",textAlign: "center" }}>Title</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", padding: "50px",textAlign: "center" }}>Subject</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", padding: "50px",textAlign: "center" }}>Status</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap", padding: "50px",textAlign: "center" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((support, i) => {
                  const isSelected = selected.includes(support.id);

                  return (
                    <TableRow hover key={support.id} selected={isSelected}>
                      <TableCell sx={{ textAlign: "center" }}>{support.id} </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{support.sentBy}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{support.title}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{support.subject}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {support.isActive === true ? (
                          <span style={{ fontWeight: 'bold', color: "green" }}>Completed</span>
                        ) : (
                          <span style={{ fontWeight: 'bold', color: "#D97706" }}>In Progress</span>
                        )}
                      </TableCell>

                      <TableCell sx={{ textAlign: "center" }}>
                        <div>
                          <Typography
                            sx={{ marginLeft: "10px", fontSize: "20px" }}
                            onClick={handleIconClick}
                          >
                            <FaEdit
                              style={{ color: "#6366F1",cursor:"pointer" }}
                              onClick={() => {
                                setUserId(support.id);
                              }}
                            />
                          </Typography>

                          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem
                              onClick={() => {
                                handleInProgress(support.isActive);
                              }}
                            >
                              In Progress
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleComplete(support.isActive);
                              }}
                            >
                              Completed
                            </MenuItem>
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
        {/* <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
      </Card>
    </div>
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
