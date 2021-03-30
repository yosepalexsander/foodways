import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

import OrderList from "../../components/macro/OrderList";
import OrderTotal from "../../components/micro/OrderTotal";

import ConfirmModal from "../../components/modal/ConfirmModal";
import MapboxModal from "../../components/modal/MapboxModal";
import MapBoxRoute from "../../components/map/MapboxRoute";
import Loading from "../../components/micro/Loading";

import { getTransactionDetail, updateTransaction } from "../../api/main";

const initialState = false;
const TransactionDetail = (props) => {
  const { id } = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(initialState);
  const [show, setShowMapModal] = useState(initialState)

  const { isLoading, data: transactionData, error, refetch } = useQuery(["transaction", parseInt(id)], async () => {
    const response = await getTransactionDetail(id);
    return response.data.data;
  });
  const totalAmount = transactionData?.transaction?.orders.reduce((amount, item) => {
    const totalAmountPerProduct = item.price * item.qty;
    return amount + totalAmountPerProduct;
  }, 0);
  const totalQty = transactionData?.transaction?.orders.reduce((qty, item) => {
    return qty + item.qty;
  }, 0);

  const transactionMutation = useMutation(body => updateTransaction(id, body), {
    onSuccess: () => {
      refetch()
    }
  })

  const handleUpdate = (status) => {
    const data = { status: status };
    transactionMutation.mutate(JSON.stringify(data))
  }
  if (isLoading) return <Loading />
  if (error) return <h1>{error.message}</h1>
  return (
    <>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item container direction="column" spacing={2} xs={5}>
          <Grid item>
            <Typography variant="h5" component="p">
              {transactionData?.transaction?.restaurant?.fullName}
              {transactionData?.transaction?.status === "success" ? (
                <CheckCircleIcon sx={{ color: "success.main" }} />
              ) : transactionData?.transaction?.status === "on the way" ? (
                <AccessTimeIcon sx={{ color: "blue" }} />
              ) : transactionData?.transaction?.status === "waiting approve" ? (
                <HourglassEmptyIcon sx={{ color: "warning.main" }} />
              ) : (
                <CancelIcon color="error" />
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={7} spacing={2}>
          <OrderList orders={transactionData?.transaction?.orders} />
          <OrderTotal
            total={totalAmount}
            qty={totalQty}
          />
          <Grid item container justifyContent="flex-end" xs={5}>
            <Grid item>
              <Button
                onClick={() => setShowMapModal(true)}
                variant="contained"
                color="secondary">
                See How Far
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MapboxModal show={show} modalControl={() => setShowMapModal(false)}>
        <MapBoxRoute page="transaction"
          locationStart={transactionData?.transaction?.restaurant?.location.split(',')}
          locationEnd={transactionData?.transaction?.userOrder?.location.split(',')}
          deliveryStatus={transactionData?.transaction?.status}
          handleUpdate={() => handleUpdate("success")} />
      </MapboxModal>
    </>
  )
}

export default TransactionDetail;
