import React from "react";
import Login from "./login/login.js";
import DashboardHeader from "./dashboardHeader/dashboardHeader.js";
import Dashboard from "./dashboard/dashboard.js";
import Chart1 from "./dashboard/chart1";
import Chart2 from "./dashboard/chart2";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/dashboard">
        <DashboardHeader />
        <Dashboard />
        <Chart1 />
        <Chart2 />
      </Route>
    </Router>
  );
}

export default App;
