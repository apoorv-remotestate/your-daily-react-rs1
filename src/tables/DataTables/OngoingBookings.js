import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  "OrderID",
  "Delivery Address",
  "Contact",
  "Order Type / Order Mode",
  "Time & Date",
  "Items",
];

export function onGoing() {
  const token = localStorage.getItem("userToken");
  const baseurl = "https://dev-api.yourdaily.co.in";
  const table1 = await fetch(
    `${baseurl}/api/store-manager/dashboard/order/active`,
    { method: "GET", headers: { Authorization: `${token}` } }
  );
  let data = await table1.json();

  if (data.length !== 0) {
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
                return (
                  <TableRow>
                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.orderID}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.userAddress}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.userPhone}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.orderType}/{data.orderMode}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.deliveryTime}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.items}
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
                <TableCell>{data}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    );
  }
}
