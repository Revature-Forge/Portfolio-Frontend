import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { url } from '../../api/api';
import { toast } from 'react-toastify';
import {useHistory} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import User from '../../models/User';

type dataUser = {

}

type BackendUser = {
    id: number,
    fName: string,
    lName: string,
    email: string,
    admin: boolean,
}
const validateAuth0 = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [cookies, setCookies]  = useCookies(undefined)
    // const history = useHistory();


    // //Auth0
    // const {user, isAuthenticated} = useAuth0();
    // // const [myUser, setMyUser] = useState<User>(User<any>);
    // let id:number = (user?.sub)?.replace("google-oauth2","");

    // const convertedUser:User = new User(
    //     id, 
    //     user.given_name, 
    //     user?.family_name, 
    //     user?.email,
    //     null,
    //     false,
    //     )

    // axios.post(url + '/users/loginAuth0', convertedUser, {withCredentials: true})
    //     .then(response => {
    //         if (response.data.admin !== true) {
    //             setCookies('user', response.data, { path: '/' })
    //             toast.success(("Login was successful. Welcome " + response.data.fname + " " + response.data.lname))
    //             history.push("/list")
    //         } else if (response.data.admin === true) {
    //             setCookies('admin', response.data, {path: "/"})
    //             toast.success(("Admin login was successful. Welcome " + response.data.fname + " " + response.data.lname))
    //             history.push("/admin")
    //         }
    //     })
    //     .catch(error => {
    //         if (error.response && error.response.status === 401) {
    //             toast.error("Invalid Account");
    //         } else {
    //             toast.error("" + error);
    //         }
    //         console.log(error.response.status);
    //     })
 

}

export default validateAuth0;