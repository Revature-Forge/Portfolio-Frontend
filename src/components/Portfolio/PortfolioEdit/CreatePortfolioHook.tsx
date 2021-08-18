import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import {toast} from "react-toastify";
import { useHistory } from "react-router-dom";
import {portfolioUrl} from "../../../api/api";

const useForm = (initialValues: any, portfolioValidate: any) => {
    const [inputs, setInputs] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [cookies, setCookies] = useCookies()
    const history = useHistory();

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const validationErrors = portfolioValidate(inputs)
        console.log(validationErrors)
        const noErrors = Object.keys(validationErrors).length === 0
        setErrors(validationErrors)
        if (noErrors) {
            axios.post(`${portfolioUrl}`, inputs, cookies['user'])
                .then(response => {
                    setCookies('portfolio', response.data, {path: "/"})
                    toast.success("Portfolio created")
                    history.push('/portfolio')
                })
                .catch(error => {
                    toast.error(error.message)
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
