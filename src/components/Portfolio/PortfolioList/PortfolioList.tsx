import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { portfolioUrl } from "../../../api/api";
import "../../../css/PortfolioList.css";
import CreatePortfolio from "../PortfolioEdit/CreatePortfolio";
import PortfolioListTable from "./PortfolioListTable";
// import { setUsers, useGetUserByIdQuery } from '../../../features/UserReducer';
import { useAppSelector, useAppDispatch } from '../../../store/Hooks'
import { setUsers, useGetUserByIdQuery } from '../../../features/UserSlice';


const PortfolioList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cookies, , removeCookie] = useCookies();
  const [table, setTable] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.id.user);
  let id = user.id;
  let userId: number;

  const SetUserRedux = () => {
    if (id !== 0 || id !== null) {
      userId = user.id;
    }
    const { data, isLoading } = useGetUserByIdQuery(userId);
    let users = data;
    dispatch(setUsers(users))
  }
  SetUserRedux();

  //NOTE. Auth0 section. Getting the user from the Auth0's session.
  const { user: userA0, logout: auth0Logout } = useAuth0();

  const handleTable = () => {
    axios
      .get(`${portfolioUrl}/users/all/${cookies["user"].id}`)
      .then((response) => {
        setTable(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleLogOut = () => {
    try {
      if (userA0) {
        auth0Logout();
      }
    } catch (error) {
      console.log(error)
    }
    removeCookie("user", { maxAge: 0 });
    if (cookies["portfolio"]) {
      removeCookie("portfolio", { maxAge: 0 });
    }

    //if auth0 user is present, let auth0 do the redirect behavior
    if (!userA0) {
      window.location.pathname = "./";
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (!e.target.files) {
      return;
    }

    if (e.target.files.length == 0) {
      return;
    }

    reader.onload = async () => {
      const user = cookies["user"];

      if (reader.result == null) {
        return;
      }

      // @ts-ignore
      const obj = JSON.parse(reader.result);
      try {
        await axios.post(
          `${portfolioUrl}/full`,
          { ...obj, user },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        window.location.reload();
      } catch (error) {
        toast.error(error.message);
      }
    };

    reader.readAsText(e.target.files[0]);
  };

  let h1Tag = <h1>Portfolio List</h1>;
  let callModal = (
    <Button variant='primary' disabled>
      Create New Portfolio
    </Button>
  );

  let logout = (
    <Button variant='primary' className='ms-2' disabled>
      Log Out
    </Button>
  );
  let upload = (
    <label htmlFor='upload' className='ms-2 btn btn-primary'>
      <span className='glyphicon glyphicon-folder-open' aria-hidden='true'>
        Upload JSON Portfolio
      </span>
      <input type='file' id='upload' onChange={handleUpload} />
    </label>
  );

  if (cookies["user"]) {
    h1Tag = (
      <h1>
        Portfolio List for {cookies["user"].fname} {cookies["user"].lname}
      </h1>
    );
    callModal = (
      <button onClick={handleShow} className='btn btn-primary'>
        Create New Portfolio
      </button>
    );
    logout = (
      <Button variant='primary' className='ms-2' onClick={() => handleLogOut()}>
        Log Out
      </Button>
    );
  }

  useEffect(() => {
    handleTable();
  }, []);

  return (
    <div className='container mt-5'>
      {h1Tag}
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header>
          <Modal.Title>Create Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePortfolio />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {callModal}
      {upload}
      {logout}
      <div className='mt-5'>
        <div className='mt-5' id='showList'>
          <div>
            <PortfolioListTable portfolios={table} handleTable={handleTable} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioList;