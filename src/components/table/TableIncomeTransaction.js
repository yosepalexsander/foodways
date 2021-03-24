import { forwardRef, Fragment, useContext } from "react";
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
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { UserContext } from "../../logics/contexts/authContext";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "& td, & th": {
      border: "2px solid rgb(130,130,130)",
    },
  },
}))(TableRow);

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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 800,
  },
  flex: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));
const TableIncomeTransaction = forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    state: { user },
  } = useContext(UserContext);
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
            {user.incomeTransaction.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="left">{index}</StyledTableCell>
                <StyledTableCell>{item.name}</StyledTableCell>
                <StyledTableCell align="left">{item.address}</StyledTableCell>
                <StyledTableCell align="left">
                  {item.productOrder}
                </StyledTableCell>
                {item.status === "Success" ? (
                  <>
                    <StyledTableCell align="left">
                      <Typography variant="body2" color="success.main">
                        {item.status}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <CheckCircleIcon sx={{ color: "success.main" }} />
                    </StyledTableCell>
                  </>
                ) : item.status === "Cancel" ? (
                  <>
                    <StyledTableCell align="left">
                      <Typography variant="body2" color="error">
                        {item.status}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <CancelIcon color="error" />
                    </StyledTableCell>
                  </>
                ) : item.status === "On The Way" ? (
                  <>
                    <StyledTableCell align="left">
                      <Typography variant="body2" color="inherit">
                        {item.status}
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
                        {item.status}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div className={classes.flex}>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ width: 80, height: 20 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          sx={{
                            width: 80,
                            height: 20,
                            fontSize: 14,
                            fontWeight: 400,
                          }}
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
    </Fragment>
  );
});

export default TableIncomeTransaction;
