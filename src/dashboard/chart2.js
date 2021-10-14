import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./chart1.css";

const Chart2 = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState(false);
  const hello = [];
  const hello2 = [];
  const hello3 = [];
  let days = 14;

  const chartGet = async () => {
    const token = localStorage.getItem("userToken");
    const baseurl = "http://yd-dev-elb-841236067.ap-south-1.elb.amazonaws.com";
    let data1 = await fetch(
      `${baseurl}/api/store-manager/dashboard/nsg/${days}`,
      {
        method: "GET",
        headers: { Authorization: `${token}` },
      }
    );
    let chartGot = await data1.json();
    setData2(true);
    setData1(chartGot);

    return chartGot;
  };
  useEffect(() => {
    chartGet();
    if (data1.length === 0) {
      chartGet().then((data) => {
        setData1(data);
        setData2(false);
      });
    }
  }, [data2]);

  if (data1 !== []) {
    data1.map((data) => {
      let datePre = JSON.stringify(data.date);
      let datePost = datePre.slice(6, 11);
      hello.push(data.nowOrders);
      hello2.push(data.scheduledOrders);
      hello3.push(datePost);
      return null;
    });
  }

  const clickHandler = (e) => {
    days = e.target.value;
    chartGet();
  };
  return (
    <>
      <section className="chart">
        <div className="main">
          <h1>Booking (Now vs Scheduled)</h1>
          <div className="some">
            <div>
              <select className="select1">
                <option value={"All"}>All Location</option>
                <option value={"Gaur City"}>Gaur City</option>
              </select>

              <select className="select2" onChange={(e) => clickHandler(e)}>
                <option value={14}>Last 14 days</option>
                <option value={30}>Last 30 days</option>
                <option value={60}>Last 2 Months</option>
              </select>
            </div>

            <div className="some2">
              <div className="some3">
                <div className="green"></div>
                <div className="legend">Now</div>
              </div>
              <div className="some3">
                <div className="red"></div>
                <div className="legend">Scheduled</div>
              </div>
            </div>
          </div>
        </div>
        <Bar
          data={{
            labels: hello3,
            datasets: [
              {
                label: "Now",
                backgroundColor: "#6AFF6A",
                data: hello,
              },
              {
                label: "Scheduled",
                backgroundColor: "#FF8383",
                data: hello2,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
                labels: {
                  font: { size: 20 },
                  textAlign: "right",
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  font: { family: "Arial, Helvetica, sans-serif", size: 20 },
                },
                grid: {
                  display: false,
                  borderColor: "#707070",
                  borderWidth: 2,
                },
              },
              y: {
                suggestedMax: 50,
                suggestedMin: 0,
                ticks: {
                  font: { family: "Arial, Helvetica, sans-serif", size: 20 },
                },
                grid: {
                  display: false,
                  borderWidth: 2,
                  borderColor: "#707070",
                },
              },
            },
          }}
        />
      </section>
    </>
  );
};
export default Chart2;
