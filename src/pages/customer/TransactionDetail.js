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

import MapboxModal from "../../components/modal/MapboxModal";
import MapBoxRoute from "../../components/map/MapboxRoute";
import Loading from "../../components/micro/Loading";

import { getTransactionDetail, updateTransaction } from "../../api/main";
import { getLocation } from "../../api/mapApi";
import icon_credit_card from "../../assets/icons/icon_credit_card.svg";

const initialState = false;
const TransactionDetail = () => {
  const { id } = useParams();
  const [showMapModal, setShowMapModal] = useState(initialState)

  const { isLoading, data: transactionData, error, refetch } = useQuery(["transaction", parseInt(id)], async () => {
    const { data } = await getTransactionDetail(id);
    const [lng, lat] = data.data.transaction.deliveryLocation.split(',');
    const locationData = await getLocation(lng, lat);
    return {
      ...data.data.transaction,
      deliveryLocation: {
        coordinates: [lng, lat],
        address: locationData.features[0].place_name
      }
    }
  });
  const totalAmount = transactionData?.orders.reduce((amount, item) => {
    const totalAmountPerProduct = item.price * item.qty;
    return amount + totalAmountPerProduct;
  }, 0);
  const totalQty = transactionData?.orders.reduce((qty, item) => {
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
  };

  if (isLoading) return <Loading />
  if (error) return <h1>{error.message}</h1>
  return (
    <>
      <Grid container direction="column">
        <Grid item container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <img src={icon_credit_card} alt="credit card icon" style={{ width: "100%", maxWidth: "150px" }} />
          </Grid>
          <Grid item xs={10} container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5" component="p">
                {transactionData?.restaurant?.fullName}
                {transactionData?.status === "success" ? (
                  <CheckCircleIcon sx={{ color: "success.main" }} />
                ) : transactionData?.status === "on the way" ? (
                  <AccessTimeIcon sx={{ color: "blue" }} />
                ) : transactionData?.status === "waiting approve" ? (
                  <HourglassEmptyIcon sx={{ color: "warning.main" }} />
                ) : (
                  <CancelIcon color="error" />
                )}
              </Typography>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={8} >
                <Typography>
                  Delivery Location: {transactionData?.deliveryLocation?.address}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => setShowMapModal(true)}
                  variant="contained"
                  fullWidth
                  color="secondary">
                  See How Far
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column" spacing={2} xs={7}>
          <OrderList orders={transactionData?.orders} />
          <OrderTotal
            total={totalAmount}
            qty={totalQty}
          />
        </Grid>
      </Grid>
      <MapboxModal show={showMapModal} modalControl={() => setShowMapModal(false)}>
        <MapBoxRoute page="transaction"
          locationEnd={transactionData?.deliveryLocation?.coordinates}
          locationStart={transactionData?.restaurant?.location.split(',')}
          deliveryStatus={transactionData?.status}
          handleUpdate={() => handleUpdate("success")} />
      </MapboxModal>
    </>
  )
}

export default TransactionDetail;
