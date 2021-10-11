import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popup from "../../popup/userdetail";

const columns = [
  "Name",
  "Contact",
  "Primary Location",
  "Total Orders",
  "Denied",
  "Cancel",
  "Total Business",
  "Average Rating",
  "Flagged",
];

function UserDetail({ select, enable, setEnable }) {
  const [openModal, setOpenModal] = useState(false);
  const [passData, setPassData] = useState({});

  const [data, setData] = useState([]);
  async function tableGet() {
    const token = localStorage.getItem("userToken");
    const baseurl = "https://dev-api.yourdaily.co.in";
    let table1 = await fetch(
      `${baseurl}/api/store-manager/dashboard/user/details`,
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
  }, [select, enable]);
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
                    <TableCell
                      style={{
                        color: "#F88A12",
                        fontSize: "22px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setPassData(dataSome);
                        setOpenModal(true);
                      }}
                    >
                      {data.name}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.contact}
                    </TableCell>

                    <TableCell style={{ color: "#777777", fontSize: "20px" }}>
                      {data.defaultAddress}
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
                      {data.flagCount}
                    </TableCell>
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
export default UserDetail;
