import axios from "axios";
import { useState, FC } from 'react'
import "../../css/Certification.css";
import {url} from "../../api/api";
import Certification from "../../interfaces/Certification";
import certificationValidation from "../Validation/CertificationValidation";
import styleInvalidElements from "../Validation/InvalidFormHandling";
import CertificationForm from "./CertificationForm";

const EducationUpdate: FC<{ hideModal: Function, editCertification: Certification }> = (props) => {
    const backEndUrl = url + "/certifications";

    const [id, setId] = useState(props.editCertification.id);
    const [name, setName] = useState(props.editCertification.name);
    const [certId, setCertId] = useState(props.editCertification.certId);
    const [issuedBy, setIssuedBy] = useState(props.editCertification.issuedBy);
    const [issuedOn, setIssuedOn] = useState(props.editCertification.issuedOn);
    const [publicUrl, setPublicUrl] = useState(props.editCertification.publicUrl);

    const [validationErrors, setValidationErrors] =  useState<string[]>([]);

    const handleUpdate = () => {


        if (certificationValidation("true", name, certId, issuedBy, issuedOn)){
            axios
                .post(backEndUrl + "/" + id, {
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
                })
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
        handleSubmit: handleUpdate,
        buttonMessage: "Update"
    };

    return (
        <CertificationForm {...formProps}/>
    );
};

export default EducationUpdate;
