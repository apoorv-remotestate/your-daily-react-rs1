//imports

import { useState, useEffect } from "react";
import "./table.css";
import { tableGet } from "./tableData";
import { tableDesign } from "./tableDesign";
import { somefunc } from "./tableDesignMUI";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DashboardHeader from "../dashboardHeader/dashboardHeader.js";

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

  const clickHandler = (e) => {
    let id = e.target.id;
    setSelect(`${id}`);
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

  const table2 = JSON.parse(JSON.stringify(table1)).map((data) => {
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
              <input
                type="checkbox"
                id={data.id}
                defaultChecked={enabled}
                onChange={() => {
                  enabled
                    ? sendEnable(data.id, false)
                    : sendEnable(data.id, true);
                  enable ? setEnable(false) : setEnable(true);
                }}
              />
              <label htmlFor={data.id}></label>
            </>
          ),
          Action: (
            <button
              type="button"
              onClick={() => {
                handleAction(data.id, select);
                enable ? setEnable(false) : setEnable(true);
              }}
            >
              Change Role
            </button>
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
        <div className="tableSelect" onClick={(e) => clickHandler(e)}>
          <div className="a" id="cart-boy">
            <h1 id="cart-boy">Cart Person</h1>
          </div>
          <div className="b" id="delivery-boy">
            <h1 id="delivery-boy">Delivery Boy</h1>
          </div>
          <div className="c" id="user-detail">
            <h1 id="user-detail">User Details</h1>
          </div>
        </div>
        <div className="table">{tableDesign(table2)}</div>
        <div className="table">{somefunc(table2)}</div>
      </div>
    </>
  );
};

export default Table;
