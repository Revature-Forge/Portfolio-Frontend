import axios from "axios";
import { setgid } from "process";
import React, { useState, useEffect } from 'react'
import { Button, Card, Modal, ModalTitle } from "react-bootstrap";
import { PlusCircle, QuestionCircle } from "react-bootstrap-icons";
import { Tooltip } from "reactstrap";
import { NumberLiteralType } from "typescript";
import "../css/Project.css";
import {toast} from "react-toastify";
import {educationUrl} from "../../api/api";

const Education = () => {
    /**
     * Show/Hide Modal
     */
    const [showModal, setShowModal] = useState(false);
    const handleHideModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [showUpdateModal,setShowUpdateModal] = useState(false);
    const handleUpdateShowModal = () => {
        setShowUpdateModal(true);
    }
    const handleUpdateHideModal = () => setShowUpdateModal(false);
    /**
     * Tooltip for add button
     */
    const [showAddTooltip, setShowAddTooltip] = useState(false);
    const toggleAddTooltip = () => setShowAddTooltip(!showAddTooltip);

    /**
     * Tooltip for details button
     */
    const [showDetailsTooltip, setShowDetailsTooltip] = useState(false);
    const toggleDetailsTooltip = () => setShowDetailsTooltip(!showDetailsTooltip);

    /**
     * 'Add education' state handling
     */
    const [university, setUniversity] = useState('');
    const [degree, setDegree] = useState('');
    const [graduationDate, setGraduationDate] = useState('');
    const [gpa, setGpa] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [id, setId] = useState('');



    // Get all Education objects from the database
    // I used fetch , as opposed to axios because i was having
    // horrible CORS problems
    // Load all education objects on load of the page
    useEffect(() => {
        const getEducation = async () => {
            const tasksFromServer = await fetchEducation();
        }
        getEducation();
    }, [])

    const fetchEducation = async () => {
        const res = await fetch(educationUrl);
        const data = await res.json();
        createAllEducation(data)
        return data;
    }

// Create all html for the Education cards
    const createAllEducation = (data: any) => {

        let headerNum: number = 1
        for (let index = 0; index < data.length; index++) {
            let gpa = document.createElement("h5")
            let universityVariable = document.createElement("h3")
            let degree = document.createElement("h1")
            let gradDate = document.createElement("h5")
            let educationParent = document.querySelector(".education")
            let card = document.createElement("div")
            let cardHeader = document.createElement("div")
            let cardBody = document.createElement("div")
            let editDiv = document.createElement("div")
            let editButton = document.createElement("button")
            let deleteButton = document.createElement("button")

            card.setAttribute("class", "card")
            cardHeader.setAttribute("class", "card-header")
            cardBody.setAttribute("class", "card-body")
            editButton.setAttribute("class", "btn btn-primary")
            deleteButton.setAttribute("class", "btn btn-danger")

            card.appendChild(cardHeader)
            //cardBody.innerHTML = "Here we can put more information on the degree" // <--- this is temp
            card.appendChild(cardBody)

            editDiv.appendChild(editButton)
            editButton.style.float = "right"
            editButton.innerHTML = "Edit"
            editButton.setAttribute("id",data[index].id);
            deleteButton.style.float = "right"
            deleteButton.innerHTML = "Delete"

            /* Define Event Listeners for the edit and delete buttons */
            
            // Event listener for edit education button
            editButton.addEventListener("click", () => {
                // Set all state so variables populate the edit Modal
                setUniversity(data[index].university);
                setDegree(data[index].degree);
                setLogoUrl(data[index].logoUrl);
                setGpa(data[index].gpa);
                //needed to save into a temp variable here because
                // setGraduationDate() wasnt working in the same way as for above
                const tempDate = data[index].graduationDate;
                setGraduationDate(tempDate);
                setId(data[index].id)

                //Pop up edit education Modal
                handleUpdateShowModal()
            })

            // Event Listener for the delete education functionality
            deleteButton.addEventListener("click", () => {
                handleDelete(data[index].id)
            })

            cardHeader.appendChild(editDiv)
            cardHeader.appendChild(degree)
            
            cardHeader.appendChild(universityVariable)
            cardHeader.appendChild(gradDate)
            cardHeader.appendChild(gpa)
            cardHeader.appendChild(deleteButton)
            
           
            gradDate.style.color = "rgb( 242, 105, 3)";
            universityVariable.innerHTML = data[index].university 
            gradDate.innerHTML = "Graduation Date: " + data[index].graduationDate
            degree.innerHTML = data[index].degree
            gpa.innerHTML = "GPA: " + data[index].gpa
        
            cardHeader.style.borderBottom = "5px solid rgb(115, 165, 194)"
            cardHeader.style.backgroundColor = "white"
            educationParent?.appendChild(card)

            if (Number(educationParent?.childElementCount) > 1) {
                card.style.marginTop = "50px"
            }

            headerNum++

        }
    }
    //*********************************************************************/
    /**
     * Save data to database
     */
    const handleSave = () => {
    
        axios
            .post(educationUrl, {
                university,
                degree,
                graduationDate,
                gpa,
                logoUrl
            })
            .then((response) => {
            })
            .catch((error) => {
                console.log("error");
            });

        setShowModal(false);
        window.location.reload();
    };


    // Delete an Education Card
    const handleDelete = async (id:number) => {
    
        axios.delete(`${educationUrl}.id`)
            .then(res => {
            })
            .catch((err) => {
                console.log(err);
            })
      
        window.location.reload();
    }  

    // POST request to update education details
    const handleUpdate = (id:any) => {
    
        axios
            .post(`${educationUrl}.id`, {
               university,
               degree,
               graduationDate,
               gpa,
               logoUrl

            })
            .then((response) => {
                console.log("success");
            })
            .catch((error) => {
                console.log("error");
            });
            window.location.reload();
    };

    /**
     * Details message
     */
    const messageDetails: string = "Add your education and certification history here";

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>
                        Education and Certifications
                        <QuestionCircle
                            id="card-info"
                            onClick={() => toast.info(messageDetails)}
                        />
                        <PlusCircle id="add-project" onClick={handleShowModal} />
                        <Tooltip
                            target="card-info"
                            isOpen={showDetailsTooltip}
                            toggle={toggleDetailsTooltip}
                        >
                            Details
                        </Tooltip>
                        <Tooltip
                            target="add-project"
                            isOpen={showAddTooltip}
                            toggle={toggleAddTooltip}
                        >
                            Add Education
                        </Tooltip>
                    </h4>
                </Card.Header>

                {/* Modal for adding a new education */}
                <Modal show={showModal} onHide={handleHideModal} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add Education</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post">
                            <h6>University Name</h6>
                            <input
                                type="text"
                                name="university"
                                className="form-input"
                                onChange={(e) => setUniversity(e.target.value)}
                            />
                            <br />
                            <h6>Degree Attained</h6>
                            <input
                                type="text"
                                name="degree"
                                className="form-input"
                                onChange={(e) =>
                                    setDegree(e.target.value)
                                }
                            />
                            <br />
                            <h6>Graduation Date</h6>
                            <input
                                type="text"
                                name="graduationDate"
                                className="form-input"
                                onChange={(e) =>
                                    setGraduationDate(e.target.value)
                                }
                            />
                            <br />
                            <h6>GPA</h6>
                            <input
                                type="text"
                                name="gpa"
                                className="form-input"
                                onChange={(e) => setGpa(e.target.value)}
                            />
                            <br />
                            <h6>Logo for the Url</h6>
                            <input
                                type="text"
                                name="logoUrl"
                                className="form-input"
                                onChange={(e) => setLogoUrl(e.target.value)}
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleHideModal}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleSave();
                                //createProject();
                            }}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            {/* Modal for updating and existing education */}
                <Modal show={showUpdateModal} onHide={handleUpdateHideModal} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Update Education</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post">
                            <h6>University Name</h6>
                            <input
                                type="text"
                                value = {university}
                                className="form-input"
                                onChange={(e) => setUniversity(e.target.value)}
                            />
                            <br />
                            <h6>Degree Attained</h6>
                            <input
                                type="text"
                                name="degree"
                                value = {degree}
                                className="form-input"
                                onChange={(e) =>
                                    setDegree(e.target.value)
                                }
                            />
                            <br />
                            <h6>Graduation Date</h6>
                            <input
                                type="text"
                                name="graduationDate"
                                value = {graduationDate}
                                className="form-input"
                                onChange={(e) =>
                                    setGraduationDate(e.target.value)
                                }
                            />
                            <br />
                            <h6>GPA</h6>
                            <input
                                type="text"
                                name="gpa"
                                value = {gpa}
                                className="form-input"
                                onChange={(e) => setGpa(e.target.value)}
                            />
                            <br />
                            <h6>Logo for the Url</h6>
                            <input
                                type="text"
                                name="logoUrl"
                                value = {logoUrl}
                                className="form-input"
                                onChange={(e) => setLogoUrl(e.target.value)}
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateHideModal}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleUpdate(id);
                                handleUpdateHideModal();
                            }}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Card.Body>
                    <Card.Text className="education"></Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Education;
