import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { url } from '../../api/api';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/Hooks'
import { setId } from '../../features/IdReducer';
import { setUsers } from '../../features/UserSlice';


const useForm = (initialValues: any, loginValidate: any) => {
    const [inputs, setInputs] = useState(initialValues)
    const [errors, setErrors] = useState({})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookies] = useCookies()
    const history = useHistory();
    const dispatch = useAppDispatch();


    const handleSubmit = (event: any) => {
        event.preventDefault()
        const validationErrors = loginValidate(inputs)
        const noErrors = Object.keys(validationErrors).length === 0
        setErrors(validationErrors)
        console.log(inputs)
        if (noErrors) {
            let email = inputs.email
            let password = inputs.password
            axios.post(url + '/users/login', null, { headers: { email, password } })
                .then(response => {
                    if (response.data.admin !== true) {
                        setCookies('user', response.data, { path: '/' })
                        toast.success(("Login was successful. Welcome " + response.data.fname + " " + response.data.lname))
                        history.push("/list")
                        dispatch(setId({ id: response.data.id }))
                    } else if (response.data.admin === true) {
                        setCookies('admin', response.data, { path: "/" })
                        toast.success(("Admin login was successful. Welcome " + response.data.fname + " " + response.data.lname))
                        history.push("/admin")
                        dispatch(setId({ id: response.data.id }))
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        toast.error("Invalid Login Credentials");
                    } else {
                        toast.error("" + error);
                    }
                    console.log(error.response.status);
                })

        } else {
            console.log("Errors, please try again", validationErrors)
        }
    }

    const handleInputChange = (event: any) => {
        event.persist()
        setInputs((inputs: any) => ({ ...inputs, [event.target.name]: event.target.value }))
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        errors
    }

}

export default useForm;