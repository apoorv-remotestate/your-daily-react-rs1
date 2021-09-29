import React from "react";
import Login from "./login/login.js";
import DashboardHeader from "./dashboardHeader/dashboardHeader.js";
import Dashboard from "./dashboard/dashboard.js";
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
      </Route>
    </Router>
  );
}

export default App;
