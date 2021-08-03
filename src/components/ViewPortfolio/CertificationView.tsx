import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import '../../css/ViewPortfolio.css';
import { useCookies } from 'react-cookie'
import {url} from "../../api/api";

interface Certification {
    id: number;
    name: string;
    certId: string;
    issuedBy: string;
    issuedOn: string;
    publicUrl: string;
}

const CertificationView = () => {
    const [certifications, setCertifications] = useState<Certification[]>();
    const [cookie] = useCookies();

    useEffect(() => {
        axios.get<Certification[]>(url + `/certifications/portfolio/all/${cookie['portfolio'].id}`).then(response => {
            setCertifications(response.data);
        });
    }, [null])

    const renderCertifications = (certifications: Certification[]) => {
        return certifications.map(data => {
            let date = data.issuedOn.substring(5, 7) + "/" + data.issuedOn.substring(8) + "/" + data.issuedOn.substring(0, 4);
            return (
                <div className="card" data-testid="card">
                    <div className="card-header" id="bottom-border">
                        <h1>Certification Name: {data.name}</h1>
                    </div>
                    <div className="card-body">
                        <span>
                            <h3>Issued By: {data.issuedBy}</h3>
                            <h5 style={{ color: "rgb(242, 105, 3)" }}>Certification ID: {data.certId}</h5>
                            <h5>Issued On: {data.issuedOn}</h5>
                        </span>
                        {(data.publicUrl !== "" && data.publicUrl !== null) &&
                            <img src={data.publicUrl} style={{ height: '100px', width: '150px' }} />
                        }
                    </div>
                </div>
            );
        })
    }

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>Certification</h4>
                </Card.Header>
                <Card.Body>
                    {certifications && renderCertifications(certifications)}
                </Card.Body>
            </Card>
        </div>
    );
}

export default CertificationView;