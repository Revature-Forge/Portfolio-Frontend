import axios from "axios";
import React, { useState, FC } from 'react'
import { useCookies } from "react-cookie";
import "../../css/Certification.css";
import {url} from "../../api/api";
import certificationValidation from "../Validation/CertificationValidation";
import styleInvalidElements from "../Validation/InvalidFormHandling";
import CertificationForm from "./CertificationForm";

const CertificationCreation: FC<{ hideModal: Function }> = (props) => {
    const backEndUrl = url + "/certifications";
    const [cookies] = useCookies();
    const portfolio = cookies['portfolio'];

    const [name, setName] = useState("");
    const [certId, setCertId] = useState("");
    const [issuedBy, setIssuedBy] = useState("");
    const [issuedOn, setIssuedOn] = useState("");
    const [publicUrl, setPublicUrl] = useState("");

    //Render Error Messages
    //*****************************************************/
    const [validationErrors, setValidationErrors] =  useState<string[]>([]);
    //*****************************************************/

    const handleSave = () => {
        if (certificationValidation(portfolio, name, certId, issuedBy, issuedOn)){
            axios
                .post(backEndUrl, {
                    portfolio,
                    name,
                    certId,
                    issuedBy,
                    issuedOn,
                    publicUrl
                })
                .then((response) => {
                })
                .catch((error) => {
                    console.log("error");
                })
                .then(() => {
                    props.hideModal();
                    window.location.reload();
                });
        }else{
            let inputElements = document.getElementsByClassName("form-input");
            styleInvalidElements(inputElements);
            setValidationErrors(["Populate the required fields"]);
        }
    };

    const formProps = {
        name,
        setName, 
        certId, 
        setCertId, 
        issuedBy, 
        setIssuedBy, 
        issuedOn, 
        setIssuedOn,
        publicUrl, 
        setPublicUrl,
        validationErrors, 
        hideModal: props.hideModal,
        handleSubmit: handleSave,
        buttonMessage: "Add"
    };

    return (
        <CertificationForm {...formProps}/>
    );
};

export default CertificationCreation;
