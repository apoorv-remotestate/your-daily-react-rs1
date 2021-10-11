import React from "react";
import Login from "./login/login.js";
import Dashboard from "./dashboard/dashboard.js";
import Table from "./tables/table";
import Detail from "./popup/userdetail";
import CDDetail from "./popup/cartDeliveryBoy";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/details/:stafftype" component={Table} />
      <Route path="/userdetail" component={Detail} />
      <Route path="/cartDeliveryDetail" component={CDDetail} />
    </Router>
  );
}

export default App;
