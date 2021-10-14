import "../tables/table.css";
import "./category.css";

import React from "react";
import { Link, useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DashboardHeader from "../dashboardHeader/dashboardHeader";

const columns = ["S.No", "Categories Name", "Name"];

const Category = () => {
  const data = [{ flagged: "adad" }];
  return (
    <>
      <DashboardHeader />
      <div class="categoryContainer">
        <div className="tableOptions">
          <Link to="/dashboard">
            <h2>Back</h2>
          </Link>
          <h3>+ Add New Cart Person</h3>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((data) => (
                  <TableCell sx={{ textAlign: "center", color: "#777777" }}>
                    {data}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody key={Date.now()}>
              {data.map((data) => {
                return (
                  <TableRow>
                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.flagged}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#F88A12",
                        fontSize: "22px",
                        cursor: "pointer",
                      }}
                      onClick={() => {}}
                    >
                      {data.flagged}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        color: "#777777",
                        fontSize: "20px",
                      }}
                    >
                      {data.flagged}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Category;
