//imports

import { useState, useEffect, useMemo } from "react";
import "./table.css";
import { tableGet } from "./tableData";
// import { tableDesign } from "./tableDesign";
import { somefunc } from "./tableDesignMUI";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "../dashboardHeader/dashboardHeader.js";
import Tabs from "@mui/material/Tabs";
import { YDTab } from "../sdk";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { YDPrimaryButton } from "../sdk";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

//Table

const Table = () => {
  //getting url selector
  let stafftypeurl = useParams();

  //States
  const [table1, setTable1] = useState([]);
  const [select, setSelect] = useState(stafftypeurl.stafftype);
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    tableGet(select).then((tableData) => setTable1(tableData));
  }, [select, enable]);

  //Role Change function

  const handleAction = async (id, role) => {
    const baseurl = "https://dev-api.yourdaily.co.in";
    const token = localStorage.getItem("userToken");
    let role1 = role === "cart-boy" ? "delivery-boy" : "cart-boy";
    console.log(id, role1);
    await fetch(`${baseurl}/api/store-manager/staff/update/role`, {
      method: "PUT",
      headers: { Authorization: `${token}` },
      body: JSON.stringify({ id: id, newRole: role1 }),
    });
  };

  //change select state

  const clickHandler = (e, newValue) => {
    setSelect(newValue);
  };

  //send enable disable

  async function sendEnable(id, enable) {
    const baseurl = "https://dev-api.yourdaily.co.in";
    const token = localStorage.getItem("userToken");

    if (enable) {
      await fetch(`${baseurl}/api/store-manager/staff/enable/${id}`, {
        method: "PUT",
        headers: { Authorization: `${token}` },
      });
    } else {
      await fetch(`${baseurl}/api/store-manager/staff/disable/${id}`, {
        method: "PUT",
        headers: { Authorization: `${token}` },
      });
    }
  }

  //formatting Data from api

  const table2 = useMemo(() => {
    return JSON.parse(JSON.stringify(table1)).map((data) => {
      const dataNew = [data].map((data) => {
        data.contact = data.contact.slice(3);
        let date = new Date(data.regDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
          dt = "0" + dt;
        }
        if (month < 10) {
          month = "0" + month;
        }
        date = dt + "/" + month + "/" + year;
        data.regDate = date;

        let enabled = data.enabled;

        if (!data.defaultAddress && data.defaultAddress !== null) {
          const dataNew = {
            Name: data.name,
            Contact: data.contact,
            "Registration Date": data.regDate,
            "Total Orders": data.totalOrders,
            Denied: data.deniedOrders,
            Cancel: data.canceledOrders,
            "Total Business": data.totalAmount,
            "Average Rating": data.avgRating,
            Flagged: data.flagged,
            "Enable/Disable": (
              <>
                <img
                  id={data.id}
                  defaultChecked={enabled}
                  onClick={() => {
                    enabled
                      ? sendEnable(data.id, false)
                      : sendEnable(data.id, true);
                    enable ? setEnable(false) : setEnable(true);
                  }}
                  src={enabled ? "/Assets/check.png" : "/Assets/uncheck.png"}
                  style={{ width: "1.806vw", height: "1.806vw" }}
                  alt="checkbox"
                />
              </>
            ),
            Action: (
              // <button
              //   type="button"
              //   onClick={() => {
              //     handleAction(data.id, select);
              //     enable ? setEnable(false) : setEnable(true);
              //   }}
              // >
              //   Change Role
              // </button>
              <YDPrimaryButton
                style={{ value: "Change Role", padding: "4px" }}
                onClick={() => {
                  handleAction(data.id, select);
                  enable ? setEnable(false) : setEnable(true);
                }}
              />
            ),
          };
          return dataNew;
        } else {
          const dataNew = {
            Name: data.name,
            Contact: data.contact,
            "Primary Location": data.defaultAddress,
            "Total Orders": data.totalOrders,
            Denied: data.deniedOrders,
            Cancel: data.canceledOrders,
            "Average Rating": data.avgRating,
            Flagged: data.flagCount,
          };

          return dataNew;
        }
      });
      return dataNew[0];
    });
  }, [table1, enable, select]);

  const columns = useMemo(() => {
    if (select === "cart-boy" || select === "delivery-boy") {
      return [
        "Name",
        "Contact",
        "Registration Data",
        "Total Orders",
        "Denied",
        "Cancel",
        "Total Business",
        "Average Rating",
        "Flagged",
        "Enable/Disable",
        "Action",
      ];
    }
    if (select === "user-detail") {
      return [
        "Name",
        "Contact",
        "Primary Location",
        "Total Orders",
        "Denied",
        "Cancel",
        "Average Rating",
        "Flagged",
      ];
    }
  }, [select]);

  //rendered

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
        {/* <div className="tableSelect" onClick={(e) => clickHandler(e)}>
          <div className="a" id="cart-boy">
            <h1 id="cart-boy">Cart Person</h1>
          </div>
          <div className="b" id="delivery-boy">
            <h1 id="delivery-boy">Delivery Boy</h1>
          </div>
          <div className="c" id="user-detail">
            <h1 id="user-detail">User Details</h1>
          </div>
        </div> */}
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
          <TabPanel value={select}>
            <div className="table">{somefunc(table2, columns)}</div>
          </TabPanel>
        </Box>
        {/* <div className="table">{tableDesign(table2)}</div> */}
        <div className="table">{somefunc(table2, columns)}</div>
      </div>
    </>
  );
};

export default Table;
