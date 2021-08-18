import axios from "axios";
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Modal } from "react-bootstrap";
import "../../css/Project.css";
import {url} from "../../api/api";
import EducationData from "../../interfaces/Education";

const EducationDelete: FC<{ hideModal: Function, editEducation: EducationData }> = (props) => {
    const backEndUrl = url + "/education";

    const [id, setId] = useState(props.editEducation.id);

    const handleDelete = () => {
        axios
            .delete(backEndUrl + "/" + id)
            .then((response) => {
            })
            .catch((error) => {
                console.log("error");
            })
            .then(() => {
                window.location.reload();
            })
    };


    return (
        <div>
            <Modal.Body><p>This will permanently delete this education. Are you sure?</p></Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => handleDelete()}>Yes, Permanently Delete</Button>
                <Button variant="secondary" onClick={() => props.hideModal()}>Close</Button>
            </Modal.Footer>
        </div>
    );
};

export default EducationDelete;
