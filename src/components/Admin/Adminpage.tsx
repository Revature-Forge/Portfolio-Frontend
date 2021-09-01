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
import { useAppSelector, useAppDispatch } from '../../store/Hooks'
import { setUsers, useGetUserByIdQuery } from '../../features/UserSlice';

const Adminpage = () => {
  // state variable for all portfolios
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [cookies, , removeCookie] = useCookies();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.id.user);
  let id = user.id;
  let userId: number;

  const SetAdminRedux = () => {
    if (id !== 0 || id !== null) {
      userId = user.id;
    }
    const { data, isLoading } = useGetUserByIdQuery(userId);
    let users = data;
    dispatch(setUsers(users));
  }

  //NOTE. Auth0 section. Getting the user from the Auth0's session.
  const { user: userA0, logout: auth0Logout } = useAuth0();

  const handleLogOut = () => {
    try {
      if (userA0) {
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

    //if auth0 user is present, let auth0 do the redirect behavior
    if (!userA0) {
      window.location.pathname = "./";
    }
  };

  // function to fetch all portfolios from back end using axios

  const getData = async () => {
    axios.get(portfolioUrl).then((response) => {
      setPortfolios(response.data);
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