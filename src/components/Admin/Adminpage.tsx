import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { portfolioUrl } from "../../api/api";
import "../../css/HonorAwards.css";
import PortfolioTable from "../Portfolio/PortfolioList/PortfolioTable";
import ScrollButton from "../ScrollButton";

const Adminpage = () => {
  // state variable for all portfolios
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [cookies, , removeCookie] = useCookies();

    //NOTE. Auth0 section. Getting the user from the Auth0's session.
    const {user, logout: auth0Logout} = useAuth0();

  const handleLogOut = () => {
    try {
      if (user) {
        console.log("hitting auth0Logout")
        auth0Logout();
        console.log("After hitting auth0Logout")
      } 
    } catch (error) {
      console.log(error)
    }
    removeCookie("user", { maxAge: 0 });
    removeCookie("admin");
    if (cookies["portfolio"]) {
      removeCookie("portfolio", { maxAge: 0 });
    }
    if (!user) {
      window.location.pathname = "./";
    }
  };

  // function to fetch all portfolios from back end using axios

  const getData = async () => {
    axios.get(portfolioUrl).then((response) => {
      setPortfolios(response.data);
      console.log(response.data);
    });
  };

  // this will be call every time setState() is called
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Container>
        <br />
        <div style={{ textAlign: "right", margin: "10px -20px -40px -10px" }}>
          <Button id='admin-button' onClick={() => handleLogOut()}>
            Logout
          </Button>
        </div>

        <h1>Welcome Back, {cookies.admin.fname}</h1>
        <Row>
          <PortfolioTable portfolios={portfolios} />
        </Row>
      </Container>
      <ScrollButton />
    </div>
  );
};

export default Adminpage;
