import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Card, Button, Modal, ModalBody} from 'react-bootstrap';
import { QuestionCircle, PlusCircle, XCircle, Pencil } from 'react-bootstrap-icons';
import { Tooltip } from 'reactstrap';
import '../../css/RevatureAboutMe.css';
import axios from 'axios'
import { useCookies } from 'react-cookie'
import {aboutMeUrl, url} from "../../api/api";
import {aboutMeValidateBio,aboutMeValidateEmail,aboutMeValidatePhone} from "../Validation/AboutMeValidation";
import {styleInvalidElementsByName} from "../Validation/InvalidFormHandling";
import ValidationMsg from '../Validation/ValidationMsg';

const RevatureAboutMe = () => {
    // Model show and hide
    //*********************************************/
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editShow, setEditShow] = useState(false);
    const handleEditShow = () => setEditShow(true);
    const handleEditClose = () => setEditShow(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const handleDeleteShow = () => setDeleteShow(true)
    const handleDeleteClose = () => setDeleteShow(false)
    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails= () => setShowDetails(true);
    //***************************************************/

    // Tooltip for add and details buttons
    //***********************************************************************/
    const [addTooltipOpen, setAddTooltipOpen] = useState(false)
    const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen)
    const [detailsTooltipOpen, setDetailsTooltipOpen] = useState(false)
    const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen)
    const[editTooltipOpen, setEditToolTipOpen] = useState(false)
    const toggleEdit = () => setEditToolTipOpen(!editTooltipOpen)
    const [deleteToolTipOpen, setDeleteToolTipOpen] = useState(false)
    const toggleDelete = () => setDeleteToolTipOpen(!deleteToolTipOpen)
     //***********************************************************************/

    // Add about me state handling
    //***************************************************/
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [id, setID] = useState('')
    //***************************************************/

    // Render error messages.
    /****************************************************/
     const [validationErrors, setValidationErrors] = useState<string[]>([]);
     const toggleValidationErrors = () => setValidationErrors(([]))
     /****************************************************/

    //COOKIES!
    const [cookies] = useCookies()
    //*************************************************** */

    // Placeholders for when the add/edit modules are brought up.
    //**************************************************************************************************/
    const bioPlaceholder = "Input a bio of at least 100 characters."
    const emailPlaceholder = "exampleEmail@mail.com";
    const phonenumberPlaceholder = "123-456-7890";
    //**************************************************************************************************/
    
    //Render about me on page
    //*********************************************************************/
    const createAboutMe = (aboutMeId: string, aboutMeBio: string, aboutMeEmail: string, aboutMePhone: string) => {

        let aboutMe = document.querySelector('.about-me-content')
        let div = document.createElement('div')        

            let rowDiv = document.createElement('div')
            let bioHeader = document.createElement('p')
            let emailHeader = document.createElement('h6')
            let phoneHeader = document.createElement('h6')
            
            setID(aboutMeId)
            bioHeader.innerHTML = aboutMeBio
            setBio(aboutMeBio)
            emailHeader.innerHTML = "Email: " + aboutMeEmail
            setEmail(aboutMeEmail)
            phoneHeader.innerHTML = "Phone: " + aboutMePhone
            setPhone(aboutMePhone)
            
            bioHeader.style.whiteSpace = "pre-wrap"
            bioHeader.style.marginBottom = "50px"
            emailHeader.style.color = "grey"
            phoneHeader.style.color = "grey"

            emailHeader.setAttribute("class", "afterStyle")
            phoneHeader.setAttribute("class", "afterStyle")
         
            div.setAttribute("class", "card")
            div.style.border = "none"

            rowDiv.appendChild(bioHeader)
            div.appendChild(rowDiv)
            div.appendChild(emailHeader)
            div.appendChild(phoneHeader)

            aboutMe?.appendChild(div)


        
        div.style.padding = "5px"
        div.style.marginBottom = "10px"
    }

    /**
     * Method to handle creation and saving of a portfolio. This method can handle both creation 
     * and updating portfolio.
     * @param portfolioId The id of the portfolio, if this is null then a new portfolio is being updated.
     */
    const handleSave = async (portfolioId:string) => {
        let portfolio = cookies['portfolio']

        // Checking to see which parts of the about me information is valid.
        const isBioValid = aboutMeValidateBio(bio);
        const isEmailValid = aboutMeValidateEmail(email);
        const isPhoneValid = aboutMeValidatePhone(phone);

        // If the information provided is valid then update update.
        if(isBioValid && isEmailValid && isPhoneValid){
            // Request variable.
            let req;
            // If there is no ID present then a new portfolio is being updated.
            if(portfolioId == ""){
                req = axios.post(url + "/aboutMe", { portfolio, bio, email, phone});
            // If there is an ID present then update the existing portfolio.
            } else {
                req = axios.post(url + "/aboutMe/" + portfolioId, { portfolioId, bio, email, phone});
            }
        
        // Process the request and update the page or catch an error.
        req.then(response => {
            console.log("success") 
            console.log(response.data)
            window.location.reload()
        })
        // If there is an error on the server side, notify the user.
        .catch(error => {
            console.log("error")
            let errorElems:string[] = ["An unknown error occured."];
            setValidationErrors(errorElems)
        })
        setShow(false)
        setEditShow(false)

        // If any of the following was false check and return which part(s) is/are invalid.
        } else {
            let errorElems:string[] = [];
            if(!isBioValid){
                let bioElement = document.getElementsByName("bioName");
                errorElems.push("Bio must be at least 100 characters.");
                styleInvalidElementsByName(bioElement);

            }
            if(!isEmailValid){
                let emailElement = document.getElementsByName("fromDate");
                errorElems.push("Input a valid email.");
                styleInvalidElementsByName(emailElement);
            }

            if(!isPhoneValid){
                let phoneElement = document.getElementsByName("toDate");
                errorElems.push("Input a valid phone number.");
                styleInvalidElementsByName(phoneElement);
            }
            // Populate the errors on the toast.
            setValidationErrors(errorElems);
        }
    }

    //GET METHOD

    const handleGet = async () => {
        axios.get(`${aboutMeUrl}/portfolio/${cookies['portfolio'].id}`)
        .then(response => {
            console.log("got the data")
            console.log(response.data)
                if(response.data.bio != undefined){
                    let kd = document.querySelector('#add-aboutMe')
                    kd?.setAttribute("class", "hide") 
                    createAboutMe(response.data.id, response.data.bio, response.data.email, response.data.phone)
                } else {
                    let editButton = document.querySelector('#edit-aboutMe')
                    let deleteButton = document.querySelector('#delete-aboutMe')

                    editButton?.setAttribute("class","hide")
                    deleteButton?.setAttribute("class","hide")
                }

        })
        .catch(error => {
            console.log("failure")
        })
    }

    useEffect(()=> {handleGet()},[]);

    // DELETE METHOD
    const handleDelete = (portfolioId: any) => {
        console.log("this is the id " + portfolioId)
        axios.delete(`${aboutMeUrl}/${portfolioId}`)
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(error => {
            console.log("delete failure")
        })
        setDeleteShow(false)
    }

    let rowLength = 10

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4 id="aboutMe-header">
                        About Me
                        <QuestionCircle id="card-info" onClick={handleShowDetails} />
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>

                        <PlusCircle id="add-aboutMe" onClick={handleShow} />
                        <Tooltip target="add-aboutMe" isOpen={addTooltipOpen} toggle={toggleAdd}>Add</Tooltip>
                        
                        <Pencil id="edit-aboutMe" onClick ={handleEditShow}>Edit</Pencil>
                        <Tooltip target="edit-aboutMe" isOpen={editTooltipOpen} toggle={toggleEdit}>Edit</Tooltip>
                        
                        <XCircle id="delete-aboutMe" onClick ={handleDeleteShow}>Delete</XCircle>
                        <Tooltip target="delete-aboutMe" isOpen={deleteToolTipOpen} toggle={toggleDelete}>Delete</Tooltip>
                        
                    </h4>
                </Card.Header>

                {/* modal for add */}

                <Modal show={show} onHide={handleClose} backdrop="static" className="myModal">
                    <Modal.Header>
                        <Modal.Title>About Me</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modalBody">
                        <form method="post">
                            <h6>Bio</h6>
                            <textarea className="form-textarea" placeholder={bioPlaceholder} name="bioName" rows={rowLength} onChange={e => setBio(e.target.value)}></textarea>
                            <h6>Email</h6>
                            <input type="email" name="fromDate" placeholder={emailPlaceholder} className="form-input" id="" onChange={e => setEmail(e.target.value)}/><br />
                            <h6>Phone #</h6>
                            <input type="text" name="toDate" placeholder={phonenumberPlaceholder} className="form-input" id="" onChange={e => setPhone(e.target.value)}/><br />
                        </form>
                        <br></br>
                        <ValidationMsg errors={validationErrors}></ValidationMsg>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {handleClose(); toggleValidationErrors();}}>
                            Close
                        </Button>
                        <Button variant="primary" className="oButton" onClick={() => {handleSave("");}}>Add</Button>
                    </Modal.Footer>
               
                </Modal>
                <Card.Body>
                    <Card.Text>
                        
                        <span className="about-me-content"></span>

                        {/* Modal for Edit */}

                        <Modal show={editShow} onHide={handleEditClose} backdrop="static">
                            <Modal.Header>
                                <Modal.Title>About Me</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form method="post">
                                    <h6>Bio</h6>
                                    <textarea className="form-textarea" name="bioName" rows={rowLength} value={bio} onChange={e => setBio(e.target.value)}></textarea>
                                    <h6>Email</h6>
                                    <input type="email" name="fromDate" className="form-input" id="" value={email} onChange={e => setEmail(e.target.value)}/><br />
                                    <h6>Phone #</h6>
                                    <input type="tel" name="toDate" className="form-input" id="" value={phone} onChange={e => setPhone(e.target.value)}/><br />
                                </form>
                                <br></br>
                                <ValidationMsg errors={validationErrors}></ValidationMsg>
                            </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => {handleEditClose(); toggleValidationErrors();}}>
                                        Close
                                    </Button>
                                    <Button className="oButton" onClick={() => {handleSave(id);}}>Update</Button>
                                </Modal.Footer>
                        </Modal>

                        {/* modal for delete */}

                        <Modal show={deleteShow} onHide={handleDeleteClose} backdrop="static">
                            <Modal.Header>
                                <Modal.Title>Delete Warning</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <p>This will permanantly delete this info. Are you sure?</p>
                            </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={() => {handleDelete(id);}}>Yes, Permanantly Delete</Button>

                                    <Button variant="secondary" onClick={handleDeleteClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                        </Modal>
                        <Modal show={showDetails} onHide={handleCloseDetails}>
                    <Modal.Header>
                        <Modal.Title>Details</Modal.Title>
                        <XCircle id="work-experience-details" onClick={handleCloseDetails}/>
                    </Modal.Header>
                    <ModalBody>
                        <p>
                            In this section, focus on your personal story and educational background information, 
                            career goals, relevant work experience, professional experience and skills, 
                            and a summary of your Revature experience.
                            <br/>
                            <br/>
                            Include your leadership qualities, problem-solving capabilities, 
                            presentation skills, communication skills, and teamplayer skills.
                            <br/>
                            <br/>
                            Do not mention your hobbies or other non-relevant information.
                        </p>
                    </ModalBody>
                </Modal>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
export default RevatureAboutMe