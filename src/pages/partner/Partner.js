import { useContext, useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { UserContext } from "../../logics/contexts/authContext";

import Transactions from "./Transactions";
import ProductList from "../../components/macro/ProductList";


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-panel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: 4, width: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Partner = () => {
  const { state: { user } } = useContext(UserContext)
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ margin: '0 0 8px' }}>
        <Grid item xs={3}>
          <img src={user.image} alt={user.fullName} style={{ width: "100%", maxWidth: "200px", height: "auto" }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom component="p">
            {user.fullName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="p">
            {user.location.name}
          </Typography>
        </Grid>
      </Grid>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="navigation tabs"
      >
        <Tab label="Transactions" sx={{ fontSize: "1.2rem" }} aria-label="transactions" />
        <Tab label="Products" sx={{ fontSize: "1.2rem" }} aria-label="products" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Transactions id={user.id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductList id={user.id} />
      </TabPanel>
    </div>
  );
};


export default Partner;
