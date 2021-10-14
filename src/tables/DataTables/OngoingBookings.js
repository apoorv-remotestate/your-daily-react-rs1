import React, { useState, useEffect } from "react";
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

function OnGoing({ select }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("userToken");
      const baseurl =
        "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";
      let table1 = await fetch(
        `${baseurl}/api/store-manager/dashboard/order/active`,
        {
          method: "GET",
          headers: { Authorization: `${token}` },
        }
      );
      let tableGot = await table1.json();

      setData(tableGot);
    })();
  }, [select]);

  if (data.length !== 0) {
    console.log(data);
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

export default OnGoing;
