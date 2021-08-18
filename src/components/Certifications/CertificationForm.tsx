import { CSSProperties } from 'react'
import { Button, Modal } from "react-bootstrap";
import "../../css/Certification.css";
import ValidationMsg from '../Validation/ValidationMsg'

let ButtonStyles: CSSProperties = {
    background: "rgb(242, 105, 3)",
    borderColor: "rgb(242, 105, 3)"
}

const CertificationForm = (props:any) => {
    return (
            <div>
                <Modal.Body>
                    <form method="post">
                        <h6>Name of Certification</h6>
                        <input
                            required
                            type="text"
                            name="name"
                            className="form-input"
                            value={props.name}
                            onChange={(e) => props.setName(e.target.value)}
                        />
                        <br />
                        <h6>Certification ID</h6>
                        <input
                            required
                            type="text"
                            name="certId"
                            className="form-input"
                            value={props.certId}
                            onChange={(e) => props.setCertId(e.target.value)}
                        />
                        <br />
                        <h6>Organization Issued By</h6>
                        <input
                            required
                            type="text"
                            name="issuedBy"
                            className="form-input"
                            value={props.issuedBy}
                            onChange={(e) => props.setIssuedBy(e.target.value)}
                        />
                        <br />
                        <h6>Date Issued On</h6>
                        <input
                            required
                            type="date"
                            name="issuedOn"
                            className="form-input"
                            value={props.issuedOn}
                            onChange={(e) => props.setIssuedOn(e.target.value)}
                        />
                        <br />
                        <h6 className="publicUrl">URL for Certification Logo (Optional)</h6>
                        <input
                            type="text"
                            name="publicUrl"
                            className="form-input-optional"
                            value={props.publicUrl}
                            onChange={(e) => props.setPublicUrl(e.target.value)}
                        />
                    </form>
                    <ValidationMsg errors={props.validationErrors}></ValidationMsg>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.hideModal()}>
                        Close
                    </Button>
                    <Button variant="primary" style={ButtonStyles} onClick={() => props.handleSubmit()} >
                        {props.buttonMessage}
                    </Button>
                </Modal.Footer>
            </div>
        );
}

export default CertificationForm;