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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";


export const CustomersTable = (props) => {
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
  return (
    <Card>
    <Scrollbar>
      <Box sx={{ minWidth: 800 }}>
      <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.map((customer) => {
                  return (
                    <TableRow hover key={customer.id}>
                      <TableCell>
                        <Typography variant="subtitle2">{customer.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{customer.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{customer?.address?.city}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{customer.phone}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{customer.website}</Typography>
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
