import { useState } from "react";
import "./table.css";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "../dashboardHeader/dashboardHeader.js";
import Tabs from "@mui/material/Tabs";
import { YDTab } from "../sdk";
import Box from "@mui/material/Box";
import OnGoing from "./DataTables/OngoingBookings";
import Past from "./DataTables/PastBookings";
import { useHistory } from "react-router";
import { DateRangePicker } from "rsuite";
// import "rsuite/dist/rsuite.min.css";
import { isAfter, formatISO } from "date-fns";

const Table = () => {
  let url = useParams();
  let history = useHistory();
  const [select, setSelect] = useState(url.type);
  const [enable, setEnable] = useState(true);
  const [start, setStart] = useState();
  // useState(
  //   new Date().setDate(new Date().getDate() - 7)
  // );
  const [end, setEnd] = useState();

  const clickHandler = (e, newValue) => {
    setSelect(newValue);
    history.push(`/booking/${newValue}`);
  };

  return (
    <>
      <DashboardHeader />

      <div className="tableMain">
        <div className="tableOptions">
          <Link to="/dashboard">
            <h2>Back</h2>
          </Link>
          <div className="tableOptionsCal">
            {select === "past" ? (
              <DateRangePicker
                size="lg"
                style={{ width: "250px" }}
                showOneCalendar
                placeholder="Select Date Range"
                appearance="default"
                value={[start, end]}
                onChange={(e) => {
                  setStart(e[0]);
                  setEnd(e[1]);
                }}
                // defaultValue={[
                //   new Date(),
                //   new Date().setDate(new Date().getDate() - 7),
                // ]}
                disabledDate={(date) => isAfter(date, new Date())}
                // style={{ boxSizing: "border-box" }}
              />
            ) : null}
          </div>
          <div></div>
        </div>
        <Box>
          <Box>
            <Tabs
              value={select}
              onChange={clickHandler}
              variant="fullWidth"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#F88A12",
                  height: "6px",
                },
              }}
            >
              <YDTab
                value="ongoing"
                label="Ongoing Booking"
                style={{
                  border: "1px black solid",

                  borderTopLeftRadius: "10px",
                }}
              />
              <YDTab
                value="past"
                label="Past Bookings"
                style={{
                  border: "1px black solid",
                  borderTopRightRadius: "10px",
                }}
              />
            </Tabs>
          </Box>
        </Box>
        {select === "ongoing" ? (
          <OnGoing select={select} enable={enable} setEnable={setEnable} />
        ) : (
          <Past
            start={start}
            end={end}
            select={select}
            enable={enable}
            setEnable={setEnable}
          />
        )}
      </div>
    </>
  );
};

export default Table;
