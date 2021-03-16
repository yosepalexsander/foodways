import { Typography } from "@material-ui/core";
import TableIncomeTransaction from "../../components/table/TableIncomeTransaction";

const Partner = () => {
  return (
    <div>
      <Typography variant="h4" color="inherit" gutterBottom>
        Income Transaction
      </Typography>
      <TableIncomeTransaction />
    </div>
  );
};

export default Partner;
