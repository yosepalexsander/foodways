import { useState } from "react";
import { useQuery } from "react-query";
import { Typography } from "@material-ui/core";

import { getPartnerTransactions, updateTransaction } from "../../api/main";
import { getLocation } from "../../api/mapApi";

import TableIncomeTransaction from "../../components/table/TableIncomeTransaction";
import Loading from '../../components/micro/Loading';
import ToastAlert from "../../components/micro/ToastAlert";

const Transactions = (props) => {
  const { id } = props
  const [alertOpen, setAlertOpen] = useState(false);
  const { isLoading, data: transactionData, isError, error, refetch } = useQuery(["transactions", id],
    async () => {
      const { data } = await getPartnerTransactions(id);
      const newData = await Promise.all(data.data.transactions.map(async transaction => {
        if (transaction.userOrder.location) {
          const [lng, lat] = transaction.userOrder.location.split(',')
          const location = await getLocation(lng, lat)
          transaction.userOrder.location = await location.features[0].place_name
        }
        return transaction
      }))
      return {
        status: data.status,
        message: data.message,
        transactions: newData
      };
    }, {
    staleTime: Infinity
  });

  const handleUpdate = async (id, transactionStatus) => {
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
        {error.response}
      </Typography>
    )
  return (
    <div>
      <TableIncomeTransaction transactionData={transactionData} onClickUpdate={handleUpdate} />
      <ToastAlert alertOpen={alertOpen} alertControl={() => setAlertOpen(false)}>
        Transaction has succesfully updated!
      </ToastAlert>
    </div>
  )
}

export default Transactions
