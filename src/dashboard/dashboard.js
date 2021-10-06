import "./dashboard.css";
import { YDPrimaryButton } from "../sdk";
import { Redirect } from "react-router-dom";
import { dataGet } from "./testData";
import { useState, useEffect } from "react";
import DashboardHeader from "../dashboardHeader/dashboardHeader.js";
import Chart1 from "../dashboard/chart1";
import Chart2 from "../dashboard/chart2";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [link, setLink] = useState();
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
  if (link) {
    return <Redirect to={link} />;
  }
  return (
    <>
      <DashboardHeader />

      <section className="dashboardDetail">
        <div className="dBBB">
          {data.map((data) => {
            return (
              <div
                className="dashboardDetailBox"
                key={data.id}
                // id={data.id}
                id={data.link}
                onClick={(e) => {
                  setLink(e.target.id || e.target.parentElement.id);
                }}
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
                    // value={data.link}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <Chart1 />
      <Chart2 />
    </>
  );
};

export default Dashboard;
