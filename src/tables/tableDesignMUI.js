import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popup from "../popup/cartDeliveryBoy";

export function Somefunc(data, columns) {
  const [openModal, setOpenModal] = useState(false);
  const [passData, setPassData] = useState({});
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
                let dataSome = data;
                return (
                  <TableRow>
                    {Object.values(data).map((data) => {
                      return (
                        <TableCell
                          sx={{ textAlign: "center", color: "#777777" }}
                          onClick={() => {
                            setPassData(dataSome);
                            setOpenModal(true);
                          }}
                        >
                          {data}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {openModal && <Popup data={passData} setOpenModal={setOpenModal} />}
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
