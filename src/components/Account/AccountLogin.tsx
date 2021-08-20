import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useForm from './LoginValidationHook';
import loginValidate from './LoginValidation';
import { useAuth0 } from '@auth0/auth0-react';
import validateAuth0 from './LoginValidationAuth0';
import User from '../../models/User';
import axios from 'axios';
import { url } from '../../api/api';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccountLogin = () => {

    const {inputs, handleInputChange, handleSubmit, errors} = useForm({email:'', password:''}, loginValidate)

    const error: {[key: string]: any} = errors

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
            let useIDAuth0:any = (user.sub)?.replace("google-oauth2","");

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
            axios.post(url + '/users/loginAuth0', convertedUser, {withCredentials: true})
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
        <div className="container mt-5">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 col-md-4">
                    <label htmlFor="email" className="form-label">Email address:</label>
                    <input type="text" className="form-control" name="email" id="email" onChange={handleInputChange} value={inputs.email} />
                    {error.email && <p style={{color:"red"}} >{error.email}</p>}
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={handleInputChange} value={inputs.password} />
                    {error.password && <p style={{color:"red"}}>{error.password}</p>}
                </div>
                <div className="mb-3 col-md-4">
                    <button type="submit" className="btn btn-primary">Login</button>

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={()=>submitAuth0()}
                        >Login Auth0</button>
                    <button 
                        type="submit" 
                        className="btn btn-danger"
                        onClick={()=>logout()}
                        >Logout</button>   
                </div>
            </form>
        </div>
    );
};

export default AccountLogin;
