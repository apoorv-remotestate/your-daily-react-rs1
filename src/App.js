import React from "react";
import Login from "./login/login.js";
import Dashboard from "./dashboard/dashboard.js";

import Table from "./tables/table";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/details/:stafftype" component={Table} />
    </Router>
  );
}

export default App;
