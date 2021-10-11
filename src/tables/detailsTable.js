import { useState } from "react";
import "./table.css";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "../dashboardHeader/dashboardHeader.js";
import Tabs from "@mui/material/Tabs";
import { YDTab } from "../sdk";
import Box from "@mui/material/Box";
import CPD from "./DataTables/CartPersonDetails";
import DBD from "./DataTables/DeliveryBoyDetails";
import User from "./DataTables/UserDetails";
import { useHistory } from "react-router";

const Table = () => {
  let stafftypeurl = useParams();
  let history = useHistory();

  const [select, setSelect] = useState(stafftypeurl.stafftype);
  const [enable, setEnable] = useState(true);

  const clickHandler = (e, newValue) => {
    setSelect(newValue);
    history.push(`/details/${newValue}`);
  };

  return (
    <>
      <DashboardHeader />

      <div className="tableMain">
        <div className="tableOptions">
          <Link to="/dashboard">
            <h2>Back</h2>
          </Link>
          <h3>+ Add New Cart Person</h3>
        </div>
        <Box>
          <Box>
            <Tabs
              value={select}
              onChange={clickHandler}
              variant="fullWidth"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#F88A12",
                  height: "6px",
                },
              }}
            >
              <YDTab
                value="cart-boy"
                label="Cart Person Details"
                style={{
                  border: "1px black solid",

                  borderTopLeftRadius: "10px",
                }}
              />
              <YDTab
                value="delivery-boy"
                label="Delivery Person Details"
                style={{
                  borderTop: "1px black solid",
                  borderBottom: "1px black solid",
                }}
              />
              <YDTab
                value="user-detail"
                label="User Details"
                style={{
                  border: "1px black solid",

                  borderTopRightRadius: "10px",
                }}
              />
            </Tabs>
          </Box>
        </Box>
        {select === "cart-boy" ? (
          <CPD select={select} enable={enable} setEnable={setEnable} />
        ) : select === "delivery-boy" ? (
          <DBD select={select} enable={enable} setEnable={setEnable} />
        ) : (
          <User select={select} enable={enable} setEnable={setEnable} />
        )}
      </div>
    </>
  );
};

export default Table;
