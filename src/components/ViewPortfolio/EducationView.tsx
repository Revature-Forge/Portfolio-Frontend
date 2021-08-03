import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import {url} from "../../api/api";

interface Education {
    id: number;
    university: string;
    degree: string;
    graduationDate: string;
    gpa: number;
    logoUrl: string;
}

const EducationView = () => {
    const [educationList, setList] = useState<Education[]>();
    const [cookie] = useCookies();

    useEffect(() => {
        axios.get<Education[]>(url + `/education/portfolio/all/${cookie['portfolio'].id}`).then(response => {
            setList(response.data);
        });
    }, [null]);

    const renderEducation = (educationList: Education[]) => {
        return educationList.map(data => {
            let date = data.graduationDate.substring(5, 7) + "/" + data.graduationDate.substring(8) + "/" + data.graduationDate.substring(0, 4);
            return (
                <div className="card" data-testid="card">
                    <div className="card-header" id="bottom-border">
                        <h1>Degree: {data.degree}</h1>
                    </div>
                    <div className="card-body" id="body-flex-content">
                        <span style={{ display: 'inline-block' }}>
                            <h3>University: {data.university}</h3>
                            <h5 style={{ color: "rgb(242, 105, 3)" }}>Graduation Date: {date}</h5>
                            <h5>GPA: {data.gpa}</h5>
                        </span>
                        {(data.logoUrl !== "" && data.logoUrl !== null) &&
                            <img src={data.logoUrl} data-testid="eduLogo" style={{ height: '100px', width: '150px' }} />
                        }
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>Education</h4>
                </Card.Header>
                <Card.Body>
                    {educationList && renderEducation(educationList)}
                </Card.Body>
            </Card>
        </div>
    );
}

export default EducationView;