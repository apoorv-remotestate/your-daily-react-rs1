import React, { useEffect, useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import "./notification.css";

function MyApp() {
  let data = [];
  let seen = [];
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (localStorage.getItem("seen")) {
      seen = localStorage.getItem("seen").split(",").map(Number);
    }
    console.log(seen);
    setInterval(() => {
      (async () => {
        const token = localStorage.getItem("userToken");
        const baseurl =
          "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";
        let table1 = await fetch(
          `${baseurl}/api/store-manager/dashboard/order/new`,
          {
            method: "GET",
            headers: { Authorization: `${token}` },
          }
        );
        let NotiGot = await table1.json();
        console.log(NotiGot);
        if (NotiGot.length === 0) {
          seen = [];
          localStorage.setItem("seen", seen);
        }
        data = NotiGot;
      })();
      if (data.length !== 0 && !data.id) {
        data.reverse();
        data.map((data) => {
          if (!seen.includes(data.orderID)) {
            const close = () => {
              closeSnackbar(key);
            };
            console.log(seen);
            console.log(data.orderID);
            seen.push(data.orderID);
            localStorage.setItem("seen", seen);
            console.log(seen);

            let key = enqueueSnackbar(
              <div
                style={{
                  width: "400px",
                  height: "200px",
                }}
              >
                <div className="NotiMain">
                  <h1>New Order {data.orderID}</h1>
                  <img
                    src="/Assets/cross_white.png"
                    alt="close"
                    role="button"
                    onClick={() => close()}
                  />
                </div>
                <div className="NotiContent">
                  <div className="NotiContentOne">
                    <h1>
                      <img src="/Assets/call.png" alt="call" />
                      {data.userPhone}
                    </h1>
                  </div>
                  <div className="NotiContentTwo">
                    <div className="NotiContentTwo-1">
                      <h1>
                        <img src="/Assets/location.png" alt="location" />
                        Customer Address
                      </h1>
                      <h2>{data.userAddressData}</h2>
                    </div>
                    <div className="NotiContentTwo-2">
                      <h1>OrderType</h1>
                      <h2>{data.orderType}</h2>
                    </div>
                  </div>
                </div>
              </div>,
              { persist: true }
            );
          }
        });
      }
    }, 5000);
  }, []);
  return null;
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      maxSnack={3}
      style={{
        margin: 0,
        padding: 0,
        borderRadius: "10px",
        width: "400px",
        height: "200px",
      }}
    >
      <MyApp />
    </SnackbarProvider>
  );
}
