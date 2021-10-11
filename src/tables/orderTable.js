import { useState } from "react";
import "./table.css";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "../dashboardHeader/dashboardHeader.js";
import Tabs from "@mui/material/Tabs";
import { YDTab } from "../sdk";
import Box from "@mui/material/Box";
import Denied from "./DataTables/DeniedOrders";
import Disputed from "./DataTables/DisputedOrders";
import Scheduled from "./DataTables/ScheduledOrders";
import { useHistory } from "react-router";

const Table = () => {
  let stafftypeurl = useParams();
  let history = useHistory();
  const [select, setSelect] = useState(stafftypeurl.type);
  const [enable, setEnable] = useState(true);

  const clickHandler = (e, newValue) => {
    setSelect(newValue);
    history.push(`/order/${newValue}`);
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
                value="denied"
                label="Denied Order"
                style={{
                  border: "1px black solid",

                  borderTopLeftRadius: "10px",
                }}
              />
              <YDTab
                value="disputed"
                label="Diputed Order"
                style={{
                  borderTop: "1px black solid",
                  borderBottom: "1px black solid",
                }}
              />
              <YDTab
                value="scheduled"
                label="Scheduled Order"
                style={{
                  border: "1px black solid",

                  borderTopRightRadius: "10px",
                }}
              />
            </Tabs>
          </Box>
        </Box>
        {select === "denied" ? (
          <Denied select={select} enable={enable} setEnable={setEnable} />
        ) : select === "disputed" ? (
          <Disputed select={select} enable={enable} setEnable={setEnable} />
        ) : (
          <Scheduled select={select} enable={enable} setEnable={setEnable} />
        )}
      </div>
    </>
  );
};

export default Table;
