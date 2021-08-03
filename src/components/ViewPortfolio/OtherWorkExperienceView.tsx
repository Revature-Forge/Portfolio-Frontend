import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import '../../css/OtherWorkExperience.css'
import {url} from "../../api/api";

interface OtherWorkExperience {
    id: number;
    description: string;
    employer: string;
    date: string;
    technologies: string;
    responsibilities: string;
    title: string;
}
/*****
 * Currently the data objects sent from backend for revature work experience 
 * and other work experience are not the same. Once they have been changed on the backend
 * to be the same. They can use the same component and just pass in a url for the different
 * endpoints
 * UPDATE: Talked with backend to change the data fields of other work experience to be the 
 * same as revature work experience. Now RevatureWorkExperienceView is used for both work experiences.
 * Currently this is only the case for viewing the portfolio. Further improvements can be made.
 * *****/
const OtherWorkExperienceView = () => {
    const [experienceList,setList] = useState<OtherWorkExperience[]>();

    useEffect(() => {
        axios.get<OtherWorkExperience[]>(url + '/workhistory').then(response => {
            setList(response.data)
        })
    }, [null]);

    const renderOtherWorkExperience = (experienceList: OtherWorkExperience[]) =>{
        return experienceList.map(data => {
            return(
                <div className="card" data-testid="card">
                    <div className="card-header">
                        {data.employer}
                    </div>
                    <div>
                        {data.title}<br/>
                        {data.description}<br/>
                        {data.date}<br/>
                        {data.responsibilities}<br/>
                        {data.technologies}<br/>
                    </div>
                </div>
            );
        })
    }

    return(
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>Other Work Experience</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {experienceList && renderOtherWorkExperience(experienceList)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default OtherWorkExperienceView;