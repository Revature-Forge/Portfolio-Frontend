import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Card, Button, Modal, ModalBody } from 'react-bootstrap'
import { QuestionCircle, PlusCircle, XCircle } from 'react-bootstrap-icons'
import { Tooltip } from 'reactstrap'
import axios from 'axios'
import '../css/RevatureWorkExperience.css'
import { url } from '../api/api'
import revWorkExpValidation, { revWorkExpErrors } from './Validation/RevatureWorkExpValidation'
import styleInvalidElements from "./Validation/InvalidFormHandling";
import ValidationMsg from './Validation/ValidationMsg';


const RevatureWorkExperience = () => {
    // Cookies
    //*************************************/
    const [cookies] = useCookies()
    const portfolio = cookies['portfolio']
    //*************************************/

    // Add work experience Modal show and hide
    //*************************************************************/
    const [showAddExperience, setShowExperience] = useState(false)
    const handleCloseAddExperience = () => {setShowExperience(false); setValidationErrors([]);}
    const handleShowAddExperience = () => setShowExperience(true)
    //*************************************************************/

    // Card details Modal show and hide
    //****************************************************/
    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails= () => setShowDetails(true);
    //***************************************************/

    // Update Modal show and hide
    //**************************************************************************/
    const [showUpdateExperience, setShowUpdateExperience] = useState(false)
    const handleCloseUpdateExperience = () => setShowUpdateExperience(false)
    const handleShowUpdateExperience = () => setShowUpdateExperience(true)
    //**************************************************************************/

    // Delete Modal show and hide
    //*****************************************************/
    const [showDelete, setShowDelete] = useState(false)
    const handleCloseDelete = () => setShowDelete(false)
    const handleShowDelete = () => setShowDelete(true)
    //*****************************************************/

    // Tooltip for add and details buttons
    //***********************************************************************/
    const [addTooltipOpen, setAddTooltipOpen] = useState(false)
    const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen)
    const [detailsTooltipOpen, setDetailsTooltipOpen] = useState(false)
    const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen)
     //***********************************************************************/

    // Add work experience state handling
    //***************************************************/
    const [employer, setEmployer] = useState('')
    const [title, setTitle] = useState('')
    const [responsibilities, setResponsibilities] = useState('')
    const [description, setDescription] = useState('')
    const [technologies, setTechnologies] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [id, setId] = useState('')
    const [validationErrors, setValidationErrors] = useState(Array<string>());
    //***************************************************/

    // Get data from data base
    //***********************************************************/
    const getData = async () => {
        axios.get(url +"/workexperience/portfolio/" + cookies['portfolio'].id)
        .then(resp => {
            createWorkExperience(resp.data)
        })
        .catch(error => {
            console.log("error")
        })
    }
    useEffect(() => {getData()}, [])
    //***********************************************************/

    //Render work experience on page
    //*********************************************************************/
    const createWorkExperience = (data: any) => {
        const bodyHeaders: Array<string> = [
            "Project Description",
            "Roles / Responsibilites",
            "Technologies"
        ]

        for (let index = 0; index < data.length; index++) {
            let headerNum: number = 1
            let workExperience = document.querySelector(".work-experience")

            let card = document.createElement("div")
            let cardHeader = document.createElement("div")
            let cardBody = document.createElement("div")

            let editDiv = document.createElement("div")
            let editButton = document.createElement("button")
            let deleteButton = document.createElement("button")

            card.setAttribute("class", "card")
            cardHeader.setAttribute("class", "card-header")
            cardBody.setAttribute("class", "card-body")
            editButton.setAttribute("class", "btn btn-secondary")
            deleteButton.setAttribute("class", "btn btn-danger")

            card.appendChild(cardHeader)
            card.appendChild(cardBody)
            cardHeader.appendChild(editDiv)

            // Store header content
            //***********************************************************************************************************************************/
            let headerContent: Array<string> = []
            const months: Array<string> = [
                "January", "February", 
                "March", "April", "May", 
                "June", "July", "August",
                "September", "October", 
                "November", "December"
            ]
            let sDate = new Date(data[index].startDate)
            let eDate = new Date(data[index].endDate)
            let duration = months[sDate.getMonth()] + " " + sDate.getFullYear() + " - " + months[eDate.getMonth()] + ' ' + eDate.getFullYear()
            headerContent.push(data[index].employer)
            headerContent.push(duration)
            headerContent.push(data[index].title)
            //***********************************************************************************************************************************/

            //Store body content
            //***********************************************/
            let bodyContent: Array<string> = []
            bodyContent.push(data[index].description)
            bodyContent.push(data[index].responsibilities)
            bodyContent.push(data[index].technologies)
            //***********************************************/

            for (let element in headerContent) {
                let component = document.createElement("h" + headerNum)
                editDiv.appendChild(editButton)
                editDiv.appendChild(deleteButton)
                editDiv.style.float = "right"

                editButton.innerHTML = "Edit"
                editButton.addEventListener("click", () => {
                    setEmployer(data[index].employer)
                    setDescription(data[index].description)
                    setTitle(data[index].title)
                    setTechnologies(data[index].technologies)
                    setResponsibilities(data[index].responsibilities)
                    setStartDate(data[index].startDate)
                    setEndDate(data[index].endDate)
                    setId(data[index].id)
                    handleShowUpdateExperience()
                })
                editButton.style.marginRight = "10px"

                deleteButton.innerHTML = "Delete"
                deleteButton.addEventListener("click", () => {
                    setId(data[index].id)
                    handleShowDelete()
                })
                
                cardHeader.appendChild(component)
                component.innerHTML = headerContent[element]
                workExperience?.appendChild(card)

                if(headerNum === 1) {
                    component.style.fontWeight = "bold"
                } else if(headerNum === 3) {
                    component.style.color = "rgb( 242, 105, 3)"
                }

                cardHeader.style.borderBottom = "5px solid rgb(115, 165, 194)"
                cardHeader.style.backgroundColor = "white" 

                if(Number(workExperience?.childElementCount) > 1) {
                    card.style.marginTop = "50px"
                }
                headerNum++
            }

            for (const element in bodyContent) {
                let bodyHeader = document.createElement("h5")
                let para = document.createElement("p")
                cardBody.appendChild(bodyHeader)
                cardBody.appendChild(para)
                bodyHeader.innerHTML = bodyHeaders[element]
                bodyHeader.style.fontWeight = "bold"
                para.innerHTML = bodyContent[element]
                para.style.whiteSpace = "pre-line"
            }
        } 
    }
    //*********************************************************************/

    // Delete work experience from database
    //*******************************************************************************************/
    const handleDelete = (input: any) => {
        axios.delete(url + "/workexperience/" + input)
        .then(resp => {
            console.log("Delete was successful");
            window.location.reload()
        })
        .catch(error => {
            console.log("error");
        })
    }
    //*******************************************************************************************/

    // Update work experience
    //***********************************************************************/
    const handleUpdate = (input: any) => {
        const valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
        const errorMsgs = revWorkExpErrors(employer, startDate, endDate, title, responsibilities, description, technologies);

        if(valid){
            axios.post(url + "/workexperience/" + input,{
                portfolio,
                employer,
                startDate,
                endDate,
                title,
                description,
                responsibilities,
                technologies
            })
            .then(resp => {
                console.log("work experience was updates");
                window.location.reload()
            })
            .catch(error => {
                console.log("error")
            })
        
        }
        else{
            console.log("INVALID");
            const elements = document.getElementsByClassName("form-input");
            styleInvalidElements(elements);
            setValidationErrors(errorMsgs);

        }
    }
    //***********************************************************************/

    // Save data to database
    //***************************************************/
    const handleSave = () => {
        const valid = revWorkExpValidation(employer, startDate, endDate, title, responsibilities, description, technologies);
        const errorMsgs = revWorkExpErrors(employer, startDate, endDate, title, responsibilities, description, technologies);

        if(valid){
            axios.post(url + "/workexperience", {
                portfolio,
                employer,
                startDate,
                endDate,
                title,
                description,
                responsibilities,
                technologies
            })
            .then(resp => {
                console.log("work experience was saved successfully")
                window.location.reload()
            })
            .catch(error => {
                console.log("error")
            })
            setEmployer('');
            setStartDate('');
            setEndDate('');
            setTitle('');
            setShowExperience(false)
        }
        else{
            console.log("INVALID");
            const elements = document.getElementsByClassName("form-input");
            styleInvalidElements(elements);
            setValidationErrors(errorMsgs);
        }
    }
    //***************************************************/

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>
                        Work Experience
                        <QuestionCircle id="card-info" onClick={handleShowDetails}/>
                        <PlusCircle id="add-work-experience" onClick={handleShowAddExperience}/>
                        <Tooltip target="add-work-experience" isOpen={addTooltipOpen} toggle={toggleAdd}>Add Work Experience</Tooltip>
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
                    </h4>
                </Card.Header>
                <Card.Body id="card-body">
                    <Card.Text className="work-experience"></Card.Text>
                </Card.Body>
            </Card>
            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header>
                    <Modal.Title>Details</Modal.Title>
                    <XCircle id="work-experience-details" onClick={handleCloseDetails}/>
                </Modal.Header>
                <ModalBody>
                    <p>This section is used to mention your work experience with Revature clients after placement. As of now, the Work Experience section should be blank.
                        <br/>
                        <br/>
                        If you have any other previous work experiences, you can mention them under the Other Experience section.
                    </p>
                </ModalBody>
            </Modal>
            <Modal show={showAddExperience} onHide={handleCloseAddExperience} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Add Work Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSave}>
                            <h6 className="work-experience-form-headers">Employer Name</h6>
                            <input type="text" name="employer" className="form-input" onChange={e => setEmployer(e.target.value)}/>
                            <h6 className="work-experience-form-headers">From</h6>
                            <input type="date" name="startDate" className="form-input" onChange={e => setStartDate(e.target.value)}/>
                            <h6 className="work-experience-create-form-headers">To</h6>
                            <input type="date" name="endDate" className="form-input" onChange={e => setEndDate(e.target.value)}/>
                            <h6 className="work-experience-form-headers">Job Title</h6>
                            <input type="text" name="title" className="form-input" onChange={e => setTitle(e.target.value)}/>
                            <h6 className="work-experience-form-headers">Roles / Responsibilites</h6>
                            <textarea name="responsibilites" className="form-input" style={{height: "100px"}} onChange={e => setResponsibilities(e.target.value)}></textarea>
                            <h6 className="work-experience-form-headers">Tools / Technologies</h6>
                            <textarea name="technologies" className="form-input" style={{height: "100px"}} onChange={e => setTechnologies(e.target.value)}></textarea>
                            <h6 className="work-experience-form-headers">Problem Description</h6>
                            <textarea name="description" className="form-input" style={{height: "100px"}} onChange={e => setDescription(e.target.value)}></textarea>
                        </form>

                        <ValidationMsg errors={validationErrors}></ValidationMsg>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddExperience}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={handleSave}>Add</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showUpdateExperience} onHide={handleCloseUpdateExperience} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Edit Work Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <h6 className="work-experience-update-form-headers">Employer Name</h6>
                            <input type="text" name="employer" className="form-input" value={employer} onChange={e => setEmployer(e.target.value)}/>
                            <h6 className="work-experience-update-form-headers">From</h6>
                            <input type="date" name="startDate" className="form-input" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                            <h6 className="work-experience-update-form-headers">To</h6>
                            <input type="date" name="endDate" className="form-input" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                            <h6 className="work-experience-update-form-headers">Job Title</h6>
                            <input type="text" name="title" className="form-input" value={title} onChange={e => setTitle(e.target.value)}/>
                            <h6 className="work-experience-update-form-headers">Roles / Responsibilites</h6>
                            <textarea name="responsibilites" className="form-input" style={{height: "100px"}} value={responsibilities} onChange={e => setResponsibilities(e.target.value)}></textarea>
                            <h6 className="work-experience-update-form-headers">Tools / Technologies</h6>
                            <textarea name="technologies" className="form-input" style={{height: "100px"}} value={technologies} onChange={e => setTechnologies(e.target.value)}></textarea>
                            <h6 className="work-experience-update-form-headers">Problem Description</h6>
                            <textarea name="description" className="form-input" style={{height: "100px"}} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </form>

                        <ValidationMsg errors={validationErrors}></ValidationMsg>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdateExperience}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={() => {handleUpdate(id)}}>Update</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
                    <Modal.Header>Delete Warning</Modal.Header>
                    <Modal.Body><p>This will permanantly delete this info. Are you sure?</p></Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {handleDelete(id)}}>Yes, Permanantly Delete</Button>
                        <Button variant="secondary" onClick={handleCloseDelete}>Close</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default RevatureWorkExperience
