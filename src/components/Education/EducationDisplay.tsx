import axios from 'axios';
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Card } from "react-bootstrap";
import "../../css/Education.css";

interface User {
    id: number;
    name: string;
    password: string;
    admin: boolean;
}

interface Portfolio {
    id: number;
    name: string;
    user: User;
    submitted: boolean;
    approved: boolean;
    reviewed: boolean;
    feedback: string;
}

interface Education {
    id: number;
    portfolio: Portfolio;
    university: string;
    degree: string;
    graduationDate: string;
    gpa: number;
    logoUrl: string;
}

const EducationDisplay: FC<{ getEditEducation: Function, showEditModal: Function, showDeleteModal: Function, currentEducation: Education, index: number }> = (props) => {
    const [id, setId] = useState(props.currentEducation.id);
    const [university, setUniversity] = useState(props.currentEducation.university);
    const [degree, setDegree] = useState(props.currentEducation.degree);
    const [graduationDate, setGraduationDate] = useState(props.currentEducation.graduationDate);
    const [gpa, setGpa] = useState(props.currentEducation.gpa);
    const [logoUrl, setLogoUrl] = useState(props.currentEducation.logoUrl);

    const cardId = "education" + id;

    const cardHeaderStyles: CSSProperties = {
        background: "white",
        borderBottom: "5px solid rgb(115, 165, 194)"
    };

    const degreeStyles: CSSProperties = {
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

    const gradDateStyles: CSSProperties = {
        color: 'rgb(242, 105, 3)'
    };

    const logoUrlStyles: CSSProperties = {
        float: 'right',
        display: 'inline',
        height: '100px',
        width: '150px'
    };

    let gradDateDisplay = graduationDate.substring(5,7)+"/"+graduationDate.substring(8)+"/"+graduationDate.substring(0,4);

    return (
        <div>
            <Card className="mb-3" id={cardId}>
                <Card.Header style={cardHeaderStyles}>
                    <h1 style={degreeStyles}>Degree: {degree}</h1>
                    <Button style={deleteButtonStyles} variant="danger" onClick={() => {
                        props.getEditEducation(props.currentEducation);
                        props.showDeleteModal();
                    }}>Delete</Button>
                    <Button style={editButtonStyles} variant="secondary" onClick={() => {
                        props.getEditEducation(props.currentEducation);
                        props.showEditModal();
                    }}>Edit</Button>
                </Card.Header>

                <Card.Body>
                    <span style={spanStyles}>
                        <h3>University: {university}</h3>
                        <h5 style={gradDateStyles}>Graduation Date: {gradDateDisplay}</h5>
                        <h5>GPA: {gpa}</h5>
                    </span>
                    {(logoUrl !== "" && logoUrl !== null) && 
                        <img style={logoUrlStyles} src={logoUrl}></img>
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

export default EducationDisplay;
