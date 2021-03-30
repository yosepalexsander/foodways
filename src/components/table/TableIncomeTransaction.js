import { forwardRef, Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import NotFound from "../micro/NotFound";
import TablePaginationActions from "./TablePaginationActions";


const StyledTableRow = withStyles({
  root: {
    "& td, & th": {
      border: "2px solid rgb(130,130,130)",
    },
  },
})(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgb(229,229,229)",
    color: theme.palette.common.black,
    fontSize: "16px",
    fontWeight: 800
  },
  body: {
    fontSize: "14px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "Inter, sans-serif"
  },
}))(TableCell);

const TableIncomeTransaction = forwardRef((props, ref) => {
  const { transactionData, onClickUpdate } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, transactionData.transactions.length - page * rowsPerPage);;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (transactionData?.transactions?.length <= 0)
    return (
      <NotFound>
        <Typography textAlign="center" component="p">
          You don't have any transaction, let's promote your products to get customer interest
      </Typography>
      </NotFound>
    )
  return (
    <Fragment>
      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="income transaction table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Products Order</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? transactionData?.transactions?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : transactionData?.transactions
            ).map((transaction, index) => (
              <StyledTableRow key={transaction.id}>
                <StyledTableCell align="left" sx={{ width: 45 }}>
                  {index}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: 100 }}>
                  {transaction.userOrder.fullName}
                </StyledTableCell>
                <StyledTableCell align="left" style={{ maxWidth: 250 }}>
                  {transaction.userOrder.location || ""}
                </StyledTableCell>
                <StyledTableCell align="left" style={{ maxWidth: 200 }}>
                  {transaction.orders.map(order => order.title).join(', ')}
                </StyledTableCell>
                {transaction.status === "success" ? (
                  <>
                    <StyledTableCell align="left" style={{ width: 130, color: "#4caf50" }}>
                      {transaction.status}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 230 }}>
                      <CheckCircleIcon sx={{ color: "success.main" }} />
                    </StyledTableCell>
                  </>
                ) : transaction.status === "cancel" ? (
                  <>
                    <StyledTableCell align="left" style={{ width: 130, color: "#f44336" }}>
                      {transaction.status}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 230 }}>
                      <CancelIcon color="error" />
                    </StyledTableCell>
                  </>
                ) : transaction.status === "on the way" ? (
                  <>
                    <StyledTableCell align="left" style={{ width: 130, color: "blue" }}>
                      {transaction.status}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 230 }}>
                      <AccessTimeIcon sx={{ color: "blue" }} />
                    </StyledTableCell>
                  </>
                ) : (
                  <>
                    <StyledTableCell align="left" style={{ width: 130, color: "#ff9800" }}>
                      {transaction.status}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 230 }}>
                      <div style={{ display: "flex", justifyContent: "space-evenly", padding: "5px 0" }}>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ width: 80, height: 20, fontSize: 14, fontWeight: 400 }}
                          onClick={() => onClickUpdate(transaction.id, "cancel")}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => onClickUpdate(transaction.id, "on the way")}
                          sx={{ width: 80, height: 20, fontSize: 14, fontWeight: 400 }}
                        >
                          Approve
                        </Button>
                      </div>
                    </StyledTableCell>
                  </>
                )}
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={transactionData?.transactions?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Fragment>
  );
});

export default TableIncomeTransaction;
