import { forwardRef, Fragment, useState } from "react";
import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Loading from '../micro/Loading';
import NotFound from "../micro/NotFound";
import ToastAlert from "../micro/ToastAlert";

import { getPartnerTransactions, updateTransaction } from "../../api/main";
import getLocation from "../../api/mapApi";

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
  },
  body: {
    fontSize: 14,
    fontFamily: "Inter, sans-serif",
  },
}))(TableCell);

const TableIncomeTransaction = forwardRef((props, ref) => {
  const { id } = props;
  const [alertOpen, setAlertOpen] = useState(false);

  const { isLoading, data: transactionData, isError, error, refetch } = useQuery(["transactions", id], async () => {
    const response = await getPartnerTransactions(id);
    return response.data;
  }, {
    onSuccess: (data) => {
      let userLocation = data.transactions.map(async transaction => {
        if (transaction.userOrder.location) {
          const data = await getLocation(transaction.userOrder.location.split(','))
          return data
        }
      })
    }
  });

  const onClickUpdate = async (id, transactionStatus) => {
    const { status, data } = await updateTransaction(id, JSON.stringify({ status: transactionStatus }));
    if (status !== 200) {
      alert("Oops error occured", data.message);
      return;
    };
    setAlertOpen(true);
    refetch();
  };

  if (isLoading) return <Loading />
  if (isError)
    return (
      <Typography textAlign="center" variant="h5">
        {error.response.data.message}
      </Typography>
    )

  if (transactionData?.data.transactions.length <= 0)
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
            {transactionData?.data.transactions.map((transaction, index) => (
              <StyledTableRow key={transaction.id}>
                <StyledTableCell align="left">{index}</StyledTableCell>
                <StyledTableCell>{transaction.userOrder.fullName}</StyledTableCell>
                <StyledTableCell align="left">{transaction.userOrder.location || ""}</StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="body2" noWrap color="inherit">
                    {transaction.orders.map(order => order.title).join(', ')}
                  </Typography>
                </StyledTableCell>
                {transaction.status === "success" ? (
                  <>
                    <StyledTableCell align="left">
                      <Typography variant="body2" color="success.main">
                        {transaction.status}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <CheckCircleIcon sx={{ color: "success.main" }} />
                    </StyledTableCell>
                  </>
                ) : transaction.status === "cancel" ? (
                  <>
                    <StyledTableCell align="left">
                      <Typography variant="body2" color="error">
                        {transaction.status}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <CancelIcon color="error" />
                    </StyledTableCell>
                  </>
                ) : transaction.status === "on the way" ? (
                  <>
                    <StyledTableCell align="left">
                      <Typography variant="body2" color="inherit">
                        {transaction.status}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <AccessTimeIcon color="inherit" />
                    </StyledTableCell>
                  </>
                ) : (
                  <>
                    <StyledTableCell align="left">
                      <Typography variant="body2" color="primary">
                        {transaction.status}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ width: 80, height: 20 }}
                          onClick={() => onClickUpdate(transaction.id, "cancel")}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => onClickUpdate(transaction.id, "success")}
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
          </TableBody>
        </Table>
      </TableContainer>
      <ToastAlert alertOpen={alertOpen} alertControl={() => setAlertOpen(false)}>
        Transaction has succesfully updated!
      </ToastAlert>
    </Fragment>
  );
});

export default TableIncomeTransaction;
