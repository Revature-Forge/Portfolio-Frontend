import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import "../../css/Project.css";
import {url} from "../../api/api";

interface Projects {
    id: number;
    name: string;
    description: string;
    responsibilities: string;
    technologies: string;
    respositoryUrl: string;
    workProducts: string;
}

const ProjectView = () => {
    const [projectList, setProjects] = useState<Projects[]>();
    const [cookie] = useCookies();

    useEffect(() => {
        axios.get<Projects[]>(url + `/projects/portfolio/all/${cookie['portfolio'].id}`).then(response => {
            setProjects(response.data);
        })
    }, [null]);

    const renderProjects = ((projectList: Projects[]) => {
        return projectList.map(data => {
            return (
                <div className="card" data-testid="card">
                    <div className="card-header" id="bottom-border">
                        <h1 style={{ fontWeight: 'bold' }}>{data.name}</h1>
                    </div>
                    <div className="card-body">
                        <p>{data.description}</p>
                        <h5>Responsibilities</h5>
                        <p>{data.responsibilities}</p>
                        <h5>Technologoies</h5>
                        <p>{data.technologies}</p>
                        <h5>Repository URL</h5>
                        <a href={data.respositoryUrl}>{data.respositoryUrl}</a>
                        <h5>Work Products</h5>
                        <img src={data.workProducts} />
                    </div>
                </div>
            );
        })
    })

    return (
        <div className="container">
            <Card id="card-container" data-testid="card-container">
                <Card.Header id="header">
                    <h4>Project</h4>
                </Card.Header>
                <Card.Body>
                    {projectList && renderProjects(projectList)}
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProjectView;