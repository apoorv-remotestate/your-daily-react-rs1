import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  "S.No",
  "Order ID",
  "Delivery Address",
  "Contact",
  "Order Type",
  "Delivery Time",
];

function Denied({ select }) {
  const [data, setData] = useState([]);

  async function tableGet(orderType) {
    const token = localStorage.getItem("userToken");
    const baseurl = "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";
    let table1 = await fetch(
      `${baseurl}/api/store-manager/dashboard/order/${orderType}`,
      {
        method: "GET",
        headers: { Authorization: `${token}` },
      }
    );
    let tableGot = await table1.json();

    return tableGot;
  }

  useEffect(() => {
    tableGet(select).then((table) => setData(table));
  }, [select]);

  if (data.length !== 0) {
    let index = 0;
    return (
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((data) => (
                  <TableCell sx={{ textAlign: "center", color: "#777777" }}>
                    {data}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody key={Date.now()}>
              {data.map((data) => {
                index += 1;
                return (
                  <TableRow>
                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {index}
                    </TableCell>
                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.orderId}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.addressData}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.userPhone}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.orderType}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.deliveryTime}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  } else {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((data) => (
                <TableCell sx={{ textAlign: "center", color: "#777777" }}>
                  {data}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    );
  }
}
export default Denied;
