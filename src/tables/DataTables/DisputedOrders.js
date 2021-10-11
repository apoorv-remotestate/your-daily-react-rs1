import React from "react";
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

export function Disputed({ data, enable, setEnable }) {
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
                let enabled = data.enabled;

                return (
                  <TableRow>
                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      Sno
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.regDate}
                    </TableCell>

                    <TableCell style={{ color: "#F88A12", fontSize: "20px" }}>
                      {data.totalOrders}
                    </TableCell>

                    <TableCell style={{ color: "#FF0000", fontSize: "20px" }}>
                      {data.deniedOrders}
                    </TableCell>

                    <TableCell style={{ color: "#4612F8", fontSize: "20px" }}>
                      {data.canceledOrders}
                    </TableCell>

                    <TableCell style={{ color: "#21F812", fontSize: "20px" }}>
                      {data.totalAmount}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.avgRating}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.flagged}
                    </TableCell>

                    <TableCell>
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
