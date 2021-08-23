import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { url } from "../../api/api";
import User from "../../models/User";


const LoginValidationAuth0 = () => {

    //NOTE. Auth0Provider
    const {loginWithRedirect} = useAuth0();
    const {logout} = useAuth0();
    const [cookies, setCookies]  = useCookies(undefined)
    const history = useHistory();

    const {user, isAuthenticated} = useAuth0();
    
    React.useEffect(() => {
        if (!isAuthenticated || !user) {
            // do nothing
        } else {
            console.log("Hitting Login Validation Auth0")
            console.log(user);
            // console.log(`Checking status of account: ${user.user_metadata.admin}`)
            
            let useIDAuth0:any = (user.sub)?.replace("google-oauth2","");
            let adminStatus:boolean;

            // if (user.user_metadata.admin === true) {
            //     adminStatus = true;
            // } else {
            //     adminStatus = false;
            // }

            let id:number = Number.parseFloat(useIDAuth0);
            const convertedUser:User = new User(
                id, 
                user.given_name, 
                user?.family_name, 
                user?.email,
                null,
                false,
                )
                
            // then the axios post request
            axios.post(url + '/users/loginAuth0', convertedUser)
                .then(response => {
                    //NOTE. Debugging
                    console.log(convertedUser)
                    console.log(`status response is ${response.status}`)

                    if(response.data) {
                        console.log(`got response data`)
                        console.log(response.data)

                    }

                    if (response.data.admin !== true) {
                        setCookies('user', response.data, { path: '/' })
                        toast.success(("Login was successful. Welcome " + response.data.fname + " " + response.data.lname))
                        history.push("/list")
                    } else if (response.data.admin === true) {
                        setCookies('admin', response.data, {path: "/"})
                        toast.success(("Admin login was successful. Welcome " + response.data.fname + " " + response.data.lname))
                        history.push("/admin")
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        toast.error("Invalid Account");
                    } else {
                        toast.error("" + error);
                    }
                    console.log(error.response.status);
                })
        }
    }, [isAuthenticated, user]);
    
    async function submitAuth0() {
        try {
            loginWithRedirect();
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <div>
            <button 
                type="submit" 
                className="btn btn-primary"
                onClick={()=>submitAuth0()}
                >Login with Auth0</button>
        </div>
    )
}

export default LoginValidationAuth0;