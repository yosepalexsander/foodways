import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import { UserContext } from "../../logics/contexts/authContext";
import TableIncomeTransaction from "../../components/table/TableIncomeTransaction";
import Products from "./Products";


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
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="navigation tabs"
      >
        <Tab label="Transactions" sx={{ fontSize: "2rem" }} />
        <Tab label="Products" sx={{ fontSize: "2rem" }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableIncomeTransaction />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Products id={user.id} />
      </TabPanel>
    </div>
  );
};


export default Partner;
