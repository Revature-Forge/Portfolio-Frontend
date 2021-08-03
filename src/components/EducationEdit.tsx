import React, { FC } from 'react'
import { Modal } from "react-bootstrap";
import "../css/Project.css";


const EducationEdit: FC<{ hideModal: Function, university: string,
     setUniversity: React.Dispatch<React.SetStateAction<string>>, degree: string, 
     setDegree: React.Dispatch<React.SetStateAction<string>>, graduationDate: string,
    setGraduationDate: React.Dispatch<React.SetStateAction<string>>, gpa: number,
    setGpa: React.Dispatch<React.SetStateAction<number>>, logoUrl: string, 
    setLogoUrl: React.Dispatch<React.SetStateAction<string>>}> = (props) => {
    
    return (
        <div>
            <Modal.Body>
                <form method="post">
                    <h6>University Name</h6>
                    <input
                        required
                        type="text"
                        name="university"
                        className="form-input"
                        value={props.university}
                        onChange={(e) => props.setUniversity(e.target.value)}
                    />
                    <br />
                    <h6>Degree Attained</h6>
                    <input
                        required
                        type="text"
                        name="degree"
                        className="form-input"
                        value={props.degree}
                        onChange={(e) =>
                            props.setDegree(e.target.value)
                        }
                    />
                    <br />
                    <h6>Graduation Date</h6>
                    <input
                        required
                        type="date"
                        name="graduationDate"
                        className="form-input"
                        value={props.graduationDate}
                        onChange={(e) =>
                            props.setGraduationDate(e.target.value)
                        }
                    />
                    <br />
                    <h6>GPA</h6>
                    <input
                        required
                        type="number"
                        name="gpa"
                        id="gpa"
                        className="form-input"
                        value={props.gpa}
                        onChange={(e) => props.setGpa(Number(e.target.value))}
                    />
                    <br />
                    <h6 className="logoUrl">URL for University Logo (Optional)</h6>
                    <input
                        type="text"
                        name="logoUrl"
                        className="form-input-optional"
                        value={props.logoUrl}
                        onChange={(e) => props.setLogoUrl(e.target.value)}
                    />
                </form>

                {/* <ValidationMsg errors={validationErrors}></ValidationMsg> */}

            </Modal.Body>
        </div>
    );
};

export default EducationEdit;