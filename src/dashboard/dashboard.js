import "./dashboard.css";
import { YDPrimaryButton } from "../sdk";
import { Redirect } from "react-router-dom";
import { dataGet } from "./testData";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (data.length === 0) {
      dataGet().then((data) => {
        setData(data);
      });
    }
  });

  if (!token || token === "undefined") {
    return <Redirect to="/" />;
  }
  return (
    <>
      <section className="dashboardDetail">
        <div className="dBBB">
          {data.map((data) => {
            return (
              <div
                className="dashboardDetailBox"
                key={data.id}
                id={data.id}
                onClick={(e) =>
                  console.log(e.target.parentElement.id || e.target.id)
                }
              >
                <h3>{data.label}</h3>
                <h2 style={{ fontSize: "1.111vw", color: "#777777" }}>
                  {data.label2}
                </h2>
                {data.value > 10000 || data.value2 > 0 ? (
                  <h1
                    style={{
                      fontSize: "2.222vw",
                      color: data.color,
                    }}
                  >
                    {data.value}/{data.value2}
                  </h1>
                ) : (
                  <h1
                    color={data.color}
                    style={{
                      fontSize: "4.861vw",
                      color: data.color,
                      fontWeight: "500",
                    }}
                  >
                    {data.value}
                  </h1>
                )}
                {data.button === true ? (
                  <YDPrimaryButton
                    style={{
                      fontSize: "1.389vw",
                      borderTopLeftRadius: "0",
                      borderTopRightRadius: "0",
                      borderBottomLeftRadius: "0.694vw",
                      borderBottomRightRadius: "0.694vw",
                      value: "View Details",
                      padding: "0.347vw",
                    }}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
