import React from "react";
import { useState, useEffect, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { YDPrimaryButton } from "../../sdk";
import Popup from "../../popup/cartDeliveryBoy";

const columns = [
  "Name",
  "Contact",
  "Registration Date",
  "Total Orders",
  "Denied",
  "Cancel",
  "Total Business",
  "Average Rating",
  "Flagged",
  "Enable/Disable",
  "Action",
];

function CPD({ select, enable, setEnable }) {
  const [openModal, setOpenModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("userToken");
      const baseurl =
        "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com/api/health";
      let table1 = await fetch(
        `${baseurl}/api/store-manager/dashboard/staff/${select}`,
        {
          method: "GET",
          headers: { Authorization: `${token}` },
        }
      );
      let tableGot = await table1.json();

      setData(tableGot);
    })();
  }, [select, enable]);

  const handleAction = useCallback(
    async (id, role) => {
      const baseurl =
        "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";
      const token = localStorage.getItem("userToken");
      let role1 = role === "cart-boy" ? "delivery-boy" : "cart-boy";
      console.log(id, role1);
      await fetch(`${baseurl}/api/store-manager/staff/update/role`, {
        method: "PUT",
        headers: { Authorization: `${token}` },
        body: JSON.stringify({ id: id, newRole: role1 }),
      });
    },
    [enable]
  );

  const sendEnable = useCallback(
    async (id, enable) => {
      const baseurl =
        "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";
      const token = localStorage.getItem("userToken");

      if (enable) {
        await fetch(`${baseurl}/api/store-manager/staff/enable/${id}`, {
          method: "PUT",
          headers: { Authorization: `${token}` },
        });
      } else {
        await fetch(`${baseurl}/api/store-manager/staff/disable/${id}`, {
          method: "PUT",
          headers: { Authorization: `${token}` },
        });
      }
    },
    [enable]
  );

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
                let enabled = data.enabled;
                return (
                  <TableRow>
                    <TableCell
                      style={{
                        textAlign: "center",
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

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.contact}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.regDate}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#F88A12",
                        fontSize: "20px",
                      }}
                    >
                      {data.totalOrders}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#FF0000",
                        fontSize: "20px",
                      }}
                    >
                      {data.deniedOrders}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#4612F8",
                        fontSize: "20px",
                      }}
                    >
                      {data.canceledOrders}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#21F812",
                        fontSize: "20px",
                      }}
                    >
                      {data.totalAmount}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.avgRating}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.flagged}
                    </TableCell>

                    <TableCell
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <img
                        id={data.id}
                        defaultChecked={enabled}
                        style={{ cursor: "pointer" }}
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

                    <TableCell>
                      <YDPrimaryButton
                        style={{ value: "Change Role", padding: "4px" }}
                        onClick={() => {
                          handleAction(data.id, select);
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
export default CPD;
