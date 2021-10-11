import React from "react";
import { useState } from "react";
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

export function Scheduled({ enable, setEnable }) {
  const token = localStorage.getItem("userToken");
  const baseurl = "https://dev-api.yourdaily.co.in";
  const table1 = await fetch(`${baseurl}/api/store-manager/scheduled/orders`, {
    method: "GET",
    headers: { Authorization: `${token}` },
  });
  let data = await table1.json();

  const handleAction = async (id) => {
    const baseurl = "https://dev-api.yourdaily.co.in";
    const token = localStorage.getItem("userToken");
    await fetch(`${baseurl}/api/store-manager/cancel/scheduled/order/${id}`, {
      method: "PUT",
      headers: { Authorization: `${token}` },
    });
  };

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

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.items.map((data) => {
                        data.name;
                        data.quantity;
                        data.baseQuantity;
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
                <TableCell>{data}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    );
  }
}
