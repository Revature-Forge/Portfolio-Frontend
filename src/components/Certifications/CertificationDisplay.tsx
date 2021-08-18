import axios from 'axios';
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Card } from "react-bootstrap";
import "../../css/Certification.css";
import Certification from "../../interfaces/Certification";

const CertificationDisplay: FC<{ getEditCertification: Function, showEditModal: Function, showDeleteModal: Function, currentCertification: Certification, index: number }> = (props) => {
    const [id, setId] = useState(props.currentCertification.id);
    const [name, setName] = useState(props.currentCertification.name);
    const [certId, setCertId] = useState(props.currentCertification.certId);
    const [issuedBy, setIssuedBy] = useState(props.currentCertification.issuedBy);
    const [issuedOn, setIssuedOn] = useState(props.currentCertification.issuedOn);
    const [publicUrl, setPublicUrl] = useState(props.currentCertification.publicUrl);

    const cardId = "certification" + id;

    const cardHeaderStyles: CSSProperties = {
        background: "white",
        borderBottom: "5px solid rgb(115, 165, 194)"
    };

    const nameStyles: CSSProperties = {
        display: 'inline'
    };

    const editButtonStyles: CSSProperties = {
        float: 'right',
        display: 'inline',
        marginTop: '0.25em',
        marginRight: '10px'
    };

    const deleteButtonStyles: CSSProperties = {
        float: 'right',
        display: 'inline',
        marginTop: '0.25em'
    };

    const spanStyles: CSSProperties = {
        display: 'inline-block'
    };

    const certIdStyles: CSSProperties = {
        color: 'rgb(242, 105, 3)'
    };

    const publicUrlStyles: CSSProperties = {
        float: 'right',
        display: 'inline',
        height: '100px',
        width: '150px'
    };

    let issuedOnDisplay = issuedOn.substring(5,7)+"/"+issuedOn.substring(8)+"/"+issuedOn.substring(0,4);

    return (
        <div>
            <Card className="mb-3" id={cardId}>
                <Card.Header style={cardHeaderStyles}>
                    <h1 style={nameStyles}>Certification Name: {name}</h1>
                    <Button style={deleteButtonStyles} variant="danger" onClick={() => {
                        props.getEditCertification(props.currentCertification);
                        props.showDeleteModal();
                    }}>Delete</Button>
                    <Button style={editButtonStyles} variant="secondary" onClick={() => {
                        props.getEditCertification(props.currentCertification);
                        props.showEditModal();
                    }}>Edit</Button>
                </Card.Header>

                <Card.Body>
                    <span style={spanStyles}>
                        <h3>Issued By: {issuedBy}</h3>
                        <h5 style={certIdStyles}>Certification ID: {certId}</h5>
                        <h5>Issued On: {issuedOnDisplay}</h5>
                    </span>
                    {(publicUrl !== "" && publicUrl !== null) && 
                        <img style={publicUrlStyles} src={publicUrl}></img>
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

export default CertificationDisplay;
