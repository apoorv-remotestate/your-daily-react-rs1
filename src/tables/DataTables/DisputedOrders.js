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
  "User Address",
  "Date & Time",
  "Contact",
  "Action",
];

function Disputed({ select }) {
  const [data, setData] = useState([]);

  async function tableGet() {
    const token = localStorage.getItem("userToken");
    const baseurl = "https://dev-api.yourdaily.co.in";
    let table1 = await fetch(
      `${baseurl}/api/store-manager/dashboard/order/disputed`,
      {
        method: "GET",
        headers: { Authorization: `${token}` },
      }
    );
    let tableGot = await table1.json();

    return tableGot;
  }

  useEffect(() => {
    tableGet().then((table) => setData(table));
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
                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {index}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.orderId}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.userAddress}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.disputedAt}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.userPhone}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.resolvedAt}
                    </TableCell>

                    {/* <TableCell>
                      <img
                        id={data.id}
                        defaultChecked={enabled}
                        onClick={() => {
                          enabled
                            ? sendEnable(data.id, false)
                            : sendEnable(data.id, true);
                          enable ? setEnable(false) : setEnable(true);
                        }}
                        src={
                          enabled ? "/Assets/check.png" : "/Assets/uncheck.png"
                        }
                        style={{ width: "1.806vw", height: "1.806vw" }}
                        alt="checkbox"
                      />
                    </TableCell> */}
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
export default Disputed;
