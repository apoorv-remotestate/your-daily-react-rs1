import { useState, useEffect } from "react";
import "./table.css";
import { tableGet } from "./tableData";
// import { tableDesign } from "./tableDesign";
import { somefunc } from "./tableDesignMUI";

const Table = () => {
  const [table1, setTable1] = useState([]);
  const [select, setSelect] = useState("cart-boy");
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    tableGet(select).then((tableData) => setTable1(tableData));
    console.log("adnaj");
  }, [select, enable]);

  const clickHandler = (e) => {
    let id = e.target.id;
    setSelect(`${id}`);
  };

  async function sendEnable(id) {
    const baseurl = "https://dev-api.yourdaily.co.in";
    const token = localStorage.getItem("userToken");
    let result = await fetch(
      `${baseurl}/api/store-manager/staff/enable/${id}`,
      {
        method: "PUT",
        headers: { Authorization: `${token}` },
      }
    );
    result = await result.json();
    console.log(result);
  }
  async function sendDisable(id) {
    const baseurl = "https://dev-api.yourdaily.co.in";
    const token = localStorage.getItem("userToken");
    let result = await fetch(
      `${baseurl}/api/store-manager/staff/disable/${id}`,
      {
        method: "PUT",
        headers: { Authorization: `${token}` },
      }
    );
    result = await result.json();
    console.log(result);
  }

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
            <input
              type="checkbox"
              defaultChecked={enabled}
              onChange={() => {
                enabled ? sendDisable(data.id) : sendEnable(data.id);
                enable ? setEnable(false) : setEnable(true);
                // enabled = !e.target.checked;
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

  return (
    <>
      <div className="tableMain">
        <div className="tableOptions">
          <h2>Back</h2>
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
        {/* <div className="table">{tableDesign(table2)}</div> */}
        <div className="table">{somefunc(table2)}</div>
      </div>
    </>
  );
};

export default Table;
