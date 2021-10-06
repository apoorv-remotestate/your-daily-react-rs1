import "./dashboardHeader.css";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";

const DashboardHeader = () => {
  const [logout, setLogout] = useState(false);

  const handleClick = () => {
    localStorage.clear();
    setLogout(true);
  };

  if (logout) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <header className="dashHeader">
        <div className="dashLogo">
          <img src="/Assets/White BG@2x.png" alt="dashboardLogo" />
          <Link to="/dashboard">
            <h1>Dashboard</h1>
          </Link>
        </div>
        <div className="dashButton">
          <img src="/Assets/Group 1623@2x.png" alt="icon" />
          <img
            onClick={() => handleClick()}
            src="/Assets/logout.png"
            alt="logout"
          />
        </div>
      </header>
    </>
  );
};
export default DashboardHeader;
