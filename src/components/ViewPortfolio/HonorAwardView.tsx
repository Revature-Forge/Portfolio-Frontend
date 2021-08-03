import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import '../../css/ViewPortfolio.css'
import {url} from "../../api/api";

interface Honor {
    id: string;
    description: string;
    dateReceived: string;
    receivedFrom: string;
    title: string;
}

const HonorAwardView = () => {
    const [honorList, setHonor] = useState<Honor[]>();
    const [cookie] = useCookies();

    useEffect(() => {
        axios.get<Honor[]>(url + `/honor/portfolio/all/${cookie['portfolio'].id}`).then(response => {
            setHonor(response.data);
        })
    }, [null]);

    const renderHonors = ((honorList: Honor[]) => {
        return honorList.map(data => {
            const date = new Date(data.dateReceived).toLocaleString('default', { month: 'long', year: 'numeric' });
            const day = new Date(data.dateReceived).getDate();
            return (
                <div className="card" key={data.id} data-testid="card">
                    <div className="card-header" id="bottom-border">
                        <h1>{data.title}</h1>
                    </div>
                    <div className="card-body">
                        <h5 style={{ fontWeight: "bold" }}>Description</h5>
                        <p>{data.description}</p>
                        <h5>Received From</h5>
                        <p>{data.receivedFrom}</p>
                        <h5>Received On</h5>
                        <p>{day} {date}</p>
                    </div>
                </div>
            );
        });
    })

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header-honoraward">
                    <h4>Honors and Awards</h4>
                </Card.Header>
                <Card.Body>
                    {honorList && renderHonors(honorList)}
                </Card.Body>
            </Card>
        </div>
    );
}

export default HonorAwardView;