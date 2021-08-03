import axios from "axios";
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Modal } from "react-bootstrap";
import "../css/Project.css";
import {url} from "../api/api";
import educationValidation, { educationValidationErrors } from "./validation/EducationValidation";
import styleInvalidElements, { styleInvalidElement } from "./validation/InvalidFormHandling";
import ValidationMsg from './validation/ValidationMsg';
import EducationData from "../interfaces/Education";
import EducationEdit from "./EducationEdit";


const EducationUpdate: FC<{ hideModal: Function, editEducation: EducationData}>= (props) => {
    const backEndUrl = url + "/education";

    const [id, setId] = useState(props.editEducation.id);
    const [university, setUniversity] = useState(props.editEducation.university);
    const [degree, setDegree] = useState(props.editEducation.degree);
    const [graduationDate, setGraduationDate] = useState(props.editEducation.graduationDate);
    const [gpa, setGpa] = useState(props.editEducation.gpa);
    const [logoUrl, setLogoUrl] = useState(props.editEducation.logoUrl);
    const [validationErrors, setValidationErrors] = useState(Array<string>());

    let updateButtonStyle: CSSProperties = {
        background: "rgb(242, 105, 3)",
        borderColor: "rgb(242, 105, 3)"
    }

    const handleUpdate= () => {
        const valid = educationValidation(university, degree, graduationDate, gpa);
        const errorElems = educationValidationErrors(university, degree, graduationDate, gpa);

            if(valid){
                axios
                    .post(backEndUrl+"/"+id, {
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
                    }) 
            }
            else{
                console.log("INVALID");
                const elements = document.getElementsByClassName("form-input");
                let gpaElement = document.getElementById("gpa");
                
                styleInvalidElements(elements);
                
                //style gpa, because gpa has default value of 0
                if(gpaElement != null) {
                    styleInvalidElement(gpaElement);
                }
                setValidationErrors(errorElems);
            }       
    };


    return (
        <div>
            <EducationEdit hideModal={props.hideModal} university={university} setUniversity={setUniversity} 
            degree={degree} setDegree={setDegree} graduationDate={graduationDate} setGraduationDate={setGraduationDate} gpa={gpa} setGpa={setGpa}
            logoUrl={logoUrl} setLogoUrl={setLogoUrl} />

            <ValidationMsg errors={validationErrors}></ValidationMsg>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.hideModal()}>
                    Close
                </Button>
                <Button variant="primary" style={updateButtonStyle} onClick={() => handleUpdate()} >
                    Update
                </Button>
            </Modal.Footer>
        </div>
    );
};

export default EducationUpdate;
