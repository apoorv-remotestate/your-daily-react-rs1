import React from "react";
import Login from "./login/login.js";
import Dashboard from "./dashboard/dashboard.js";
import DetailsTable from "./tables/detailsTable.js";
import OrderTable from "./tables/orderTable";
import BookingsTable from "./tables/BookingsTable";
import Test from "./Categories/category";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/details/:stafftype" component={DetailsTable} />
      <Route path="/order/:type" component={OrderTable} />
      <Route path="/booking/:type" component={BookingsTable} />
      <Route exact path="/test" component={Test} />
    </Router>
  );
}

export default App;
