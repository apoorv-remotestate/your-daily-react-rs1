import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatISO } from "date-fns";

const columns = [
  "OrderID",
  "Delivery Address",
  "Contact",
  "Order Type / Order Mode",
  "Date & Time",
  "Items",
];

function Past({ select, start, end }) {
  const [data, setData] = useState([]);
  start === undefined
    ? (start = new Date().setDate(new Date().getDate() - 7))
    : (start = start);
  end === undefined
    ? (end = new Date().setDate(new Date().getDate() - 7))
    : (end = end);
  const startDate = formatISO(start);
  const endDate = formatISO(end);

  const sfs = { startDate, endDate };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("userToken");
      const baseurl =
        "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";
      let table1 = await fetch(
        `${baseurl}/api/store-manager/dashboard/order/history`,
        {
          method: "POST",
          headers: { Authorization: `${token}` },
          body: JSON.stringify(sfs),
        }
      );
      let tableGot = await table1.json();

      setData(tableGot);
    })();
  }, [select, sfs]);

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

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.items.map((data) => {
                        if (data) {
                          return (
                            <TableCell
                              style={{
                                textAlign: "center",
                                color: "#777777",
                                fontSize: "20px",
                                border: "0px",
                                display: "flex",
                                flexDirection: "column",
                                margin: "0px",
                                padding: "0px",
                                minWidth: "200px",
                              }}
                            >
                              {data.name}--{data.quantity} :{data.baseQuantity}
                            </TableCell>
                          );
                        }
                      })}
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
      // <TableContainer>
      //   <Table>
      //     <TableHead>
      //       <TableRow>
      //         {columns.map((data) => (
      //           <TableCell>{data}</TableCell>
      //         ))}
      //       </TableRow>
      //     </TableHead>
      //   </Table>
      // </TableContainer>
      null
    );
  }
}
export default Past;
