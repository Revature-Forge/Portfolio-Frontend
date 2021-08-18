import axios from "axios";
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import "../../css/Project.css";
import {url} from "../../api/api";
import educationValidation, { educationValidationErrors } from "../Validation/EducationValidation";
import styleInvalidElements, { styleInvalidElement } from "../Validation/InvalidFormHandling";
import ValidationMsg from '../Validation/ValidationMsg';
import EducationEdit from "./EducationEdit";

const EducationCreation: FC<{hideModal: Function}>= (props) => {
    const backEndUrl = url + "/education";
    const [cookies] = useCookies();
    const portfolio = cookies['portfolio'];

    const [university, setUniversity] = useState("");
    const [degree, setDegree] = useState("");
    const [graduationDate, setGraduationDate] = useState("");
    const [gpa, setGpa] = useState(0.0);
    const [logoUrl, setLogoUrl] = useState("");
    const [validationErrors, setValidationErrors] = useState(Array<string>());
    

    const handleSave = () => {
        const valid = educationValidation(university, degree, graduationDate, gpa);
        const errorElems = educationValidationErrors(university, degree, graduationDate, gpa);

        if(valid){
            console.log("VALID");

            axios
                .post(backEndUrl, {
                    portfolio,
                    university,
                    degree,
                    graduationDate,
                    gpa,
                    logoUrl
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
        }
        else{
            console.log("INVALID");
            let inputElements = document.getElementsByClassName("form-input");
            let gpaElement = document.getElementById("gpa");
            
            styleInvalidElements(inputElements);

            //style gpa, because gpa has default value of 0
            if(gpaElement != null) {
                styleInvalidElement(gpaElement);
            }
            setValidationErrors(errorElems);
        }
    };

    let addButtonStyles: CSSProperties = {
        background: "rgb(242, 105, 3)",
        borderColor: "rgb(242, 105, 3)"
    }

    return (
        <div>
            <EducationEdit hideModal={props.hideModal}  university={university} setUniversity={setUniversity} 
            degree={degree} setDegree={setDegree} graduationDate={graduationDate} setGraduationDate={setGraduationDate} gpa={gpa} setGpa={setGpa}
            logoUrl={logoUrl} setLogoUrl={setLogoUrl} />

            <ValidationMsg errors={validationErrors}></ValidationMsg>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.hideModal()}>
                    Close
                </Button>
                <Button variant="primary" style={addButtonStyles} onClick={() => handleSave()} >
                    Add
                </Button>
            </Modal.Footer>
        </div>
    );
};

export default EducationCreation;
