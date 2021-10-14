import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { YDPrimaryButton } from "../../sdk";

const columns = [
  "Order ID",
  "User Address",
  "Date & Time",
  "Mode",
  "Amount",
  "Items",
  "Action",
];

function Scheduled({ select, enable, setEnable }) {
  const [data, setData] = useState([]);

  async function tableGet() {
    const token = localStorage.getItem("userToken");
    const baseurl = "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";
    let table1 = await fetch(`${baseurl}/api/store-manager/scheduled/orders`, {
      method: "GET",
      headers: { Authorization: `${token}` },
    });
    let tableGot = await table1.json();
    return tableGot;
  }

  useEffect(() => {
    tableGet().then((table) => setData(table));
  }, [select, enable]);

  const handleAction = async (id) => {
    const baseurl = "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";
    const token = localStorage.getItem("userToken");
    await fetch(`${baseurl}/api/store-manager/cancel/scheduled/order/${id}`, {
      method: "PUT",
      headers: { Authorization: `${token}` },
    });
  };

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
                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.id}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.address.addressData}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      Start Date: {data.startDate}
                      Delivery Time: {data.deliveryTime}
                      {data.weekdays}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.mode}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.amount}
                    </TableCell>
                    {/* <TableCell></TableCell> */}

                    {/* <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.items.name} {data.items.quantity}
                      {data.items.baseQuantity}
                    </TableCell> */}
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

                    <TableCell>
                      <YDPrimaryButton
                        style={{
                          textAlign: "center",
                          value: "Cancel",
                          padding: "4px",
                        }}
                        onClick={() => {
                          handleAction(data.id);
                          enable ? setEnable(false) : setEnable(true);
                        }}
                      />
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
export default Scheduled;
