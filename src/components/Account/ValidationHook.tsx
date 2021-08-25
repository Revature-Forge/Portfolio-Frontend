import axios from 'axios';
import {useState} from 'react';
import {url} from '../../api/api';
import {toast} from 'react-toastify';
import {useHistory} from "react-router-dom";
import {  useGetRegisterMutation  } from "../../services/register"

const useForm = (initialValues: any, validate: any, hideModal: any) => {
    const [inputs, setInputs] = useState(initialValues)
    const [errors, setErrors] = useState({})
	//const { data, error,isLoading, isSuccess, isError }  = useGetRegisterMutation()//useGetRegisterQuery(input);
	const [ getRegister, { data, error,isLoading, isSuccess, isError }  ] = useGetRegisterMutation()

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const validationErrors = validate(inputs)
        const noErros = Object.keys(validationErrors).length === 0
        setErrors(validationErrors)
        if(noErros) {
			getRegister(inputs);

			/*
            axios.post(url + '/users', inputs)
            .then(response => {
                console.log(inputs)
                toast.success("You have been registered! Please login.")
            })
            .catch(error => {
                toast.error("" + error)
                console.log(error)
            })*/
        } else {
            console.log("Errors, please try again", validationErrors)
        }
    }

    const handleInputChange = (event: any) => {
        event.persist()
        setInputs((inputs: any) => ({...inputs, [event.target.name]: event.target.value}))
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        errors,
        isLoading,
		isSuccess,
		isError,
        data,
        }
    
    

}

export default useForm;
