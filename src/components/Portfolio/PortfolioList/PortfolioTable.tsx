import axios from "axios";
import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { WindowSidebar } from "react-bootstrap-icons";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { portfolioUrl } from "../../../api/api";
import "../../../css/PortfolioTable.css";
import { requestSort, defaultArrows } from "./PortfolioListTable";

function PortfolioTable(props: any) {
  const [, setCookie] = useCookies();
  const [sortConfig, setSortConfig]: any = useState("approved");

  const [directionArrows, setDirections] = useState(defaultArrows);
  let history = useHistory();

  let { portfolios } = props;
  let sortedPortfolios = [...portfolios];
  useMemo(() => {
    if (sortConfig !== null) {
      sortedPortfolios.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedPortfolios;
  }, [sortConfig]);

  const renderviewdetail = (id: any): void => {
    let pathname = "./view";
    axios
      .get(`${portfolioUrl}/${id}`)
      .then((response) => {
        setCookie("portfolio", response.data, { path: "/" });
        history.push("/view")
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const reportPage = (): void => {
    let pahtname = "./AdminReportPage";
    window.location.pathname = pahtname;
  }

  return (
    <Table style={{ margin: "10px" }} striped table-bordered hover>
      <thead>
        <tr>
          <th onClick={() => requestSort("name", sortConfig, setDirections, setSortConfig)}>
            Portfolio Name {directionArrows.name}
          </th>
          <th onClick={() => requestSort("submitted", sortConfig, setDirections, setSortConfig)}>
            Submission Status {directionArrows.submitted}
          </th>
          <th onClick={() => requestSort("approved", sortConfig, setDirections, setSortConfig)}>
            Approved Status {directionArrows.approved}
          </th>
          <th onClick={() => requestSort("reviewed", sortConfig, setDirections, setSortConfig)}>
            Review Status {directionArrows.reviewed}
          </th>
          <th>
            <button className="btn btn-primary" onClick={() => reportPage()}> 
            Admin report page
             </button>
          </th>
          <th>

          </th>
        </tr>
      </thead>
      <tbody>
        {sortedPortfolios.map((portfolio: any) => {
          return (
            <tr key={portfolio.id} id="table-rows">
              <td>{portfolio.name}</td>
              <td>{portfolio.submitted ? "Submitted" : "Pending"}</td>
              <td>{portfolio.approved ? "Approved" : "Rejected"}</td>
              <td>{portfolio.reviewed ? "Reviewed" : "Not Reviewed"}</td>
              <td>
                {" "}
                <button
                  className="btn btn-primary"
                  id={
                    portfolio.submitted && !portfolio.approved
                      ? "admin-button"
                      : "admin-button2"
                  }
                  onClick={() => renderviewdetail(portfolio.id)}
                >
                  {portfolio.submitted ? "Flag Portfolio" : "View Portfolio"}
                </button>{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default PortfolioTable;
