import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Card, Button, Modal} from 'react-bootstrap';
import { QuestionCircle, PlusCircle, XCircle } from 'react-bootstrap-icons';
import { Tooltip } from 'reactstrap';
import { useCookies } from 'react-cookie';

import '../css/OtherWorkExperience.css'
import { url } from '../api/api';
import otherWorkExpValidation from './validation/OtherWorkExpValidation';
import { styleInvalidElementsByNameNotNull } from './validation/InvalidFormHandling';
import ValidationMsg from './validation/ValidationMsg'

const OtherWorkExperience = () => {
    const [cookies] = useCookies();

    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); setValidationErrors([]); }
    const handleShow = () => setShow(true);

    const [employer, setEmployer] = useState("");
    const [title, setTitle] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [description, setDescription] = useState("");
    const [tools, setTools] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");   
    const [id, setId] = useState("");

    // Tooltip for add and details buttons
    //***********************************************************************/
    const [addTooltipOpenOWE, setAddTooltipOpenOWE] = useState(false)
    const toggleAddOWE = () => setAddTooltipOpenOWE(!addTooltipOpenOWE)
    const [detailsTooltipOpenOWE, setDetailsTooltipOpenOWE] = useState(false)
    const toggleDetails = () => setDetailsTooltipOpenOWE(!detailsTooltipOpenOWE)
    //***********************************************************************/

    // Card details Modal show and hide
    //****************************************************/
    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails= () => setShowDetails(true);
    //***************************************************/

    // Update Modal show and hide
    //**************************************************************************/
    const[showUpdateExperience, setShowUpdateExperience] = useState(false)
    const handleCloseUpdateExperience = () => { setShowUpdateExperience(false); setValidationErrors([]); }
    const handleShowUpdateExperience = () => setShowUpdateExperience(true)
    //**************************************************************************/

    // Delete Modal show and hide
    //*****************************************************/
    const [showDeleteOWE, setShowDeleteOWE] = useState(false)
    const handleCloseDeleteOWE = () => setShowDeleteOWE(false)
    const handleShowDeleteOWE = () => setShowDeleteOWE(true)
    //*****************************************************/

    //Render Error Messages
    //*****************************************************/
    const [validationErrors, setValidationErrors] =  useState<string[]>([]);
    //*****************************************************/

    // Get data from data base
    //***********************************************************/
    const getData = async () => {
        axios.get(url + "/workhistory/portfolio/" + cookies["portfolio"].id)
        .then(resp => {
            createWorkExperience(resp.data);
        })
        .catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {getData()}, [])
    //***********************************************************/

    // Delete work experience from database
    //*******************************************************************************************/
    const handleDelete = (input: any) => {
        axios.delete(url + "/workhistory/" + input)
        .then(resp => {
            console.log("Delete was successful");
            window.location.reload()
        })
        .catch(error => {
            console.log("error");
        })
    }
    //*******************************************************************************************/


    // Save data to database
    /**** ERROR CHECKING PREVENTS SAVING TO DB ON ERROR ****/

    //***************************************************/
    const handleSave = () => {

        //Validate field contents from validation/OtherWorkExpValidation.tsx
        const wrkExpObj: any = {
            employer: employer,
            title: title,
            responsibilities: responsibilities,
            description: description,
            tools: tools,
            startDate: startDate,
            endDate: endDate
        }

        //returns string *array* returning which above states have errors, in above order
        const errorElems = otherWorkExpValidation(wrkExpObj);
        let isValid = true;
        errorElems.forEach((elem) => { isValid = isValid && !elem});

        //Continue and save data if all fields are valid
        if(isValid) 
        {
            let portfolio = cookies['portfolio'];
            console.log(portfolio);
            axios.post(url + "/workhistory", {
                employer,
                title,
                responsibilities,
                description,
                tools,
                startDate,
                endDate,
                portfolio
            })
            .then(resp => {
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    
            setEmployer("");
            setTitle("");
            setResponsibilities("");
            setDescription("");
            setTools("");
            setStartDate("");
            setEndDate("");
            setValidationErrors([]);
            setShow(false);
        }
        else {
            /* log error to the console
                - iterate over HTML elements and style inccorect elements
                - do not close display
            */
            console.log("Error: Invalid fields in other work Experience form");
            Object.keys(wrkExpObj).forEach((key: string, keyIndex: number) => {
                styleInvalidElementsByNameNotNull(document.getElementsByName(key), !errorElems[keyIndex] );
             });
            
             console.log("errr elems: "+errorElems);
             setValidationErrors(errorElems);
        }

        
    }
    //***************************************************/

    // Update work experience
    //***********************************************************************/
    const handleUpdate = (input: any) => {
        let portfolio = cookies['portfolio'];

         //Validate field contents from validation/OtherWorkExpValidation.tsx
         const wrkExpObj: any = {
            employer: employer,
            title: title,
            responsibilities: responsibilities,
            description: description,
            tools: tools,
            startDate: startDate,
            endDate: endDate
        }

        //returns boolean *array* indicating which above state is valid, in above order
        const errorElems = otherWorkExpValidation(wrkExpObj);
        let isValid = true;
        errorElems.forEach((elem) => { isValid = isValid && !elem});

        //Continue and update data if all fields are valid
        if(isValid) 
        {
            let id:any = input;
            axios.put(url + "/workhistory",{
                id,
                employer,
                startDate,
                endDate,
                title,
                description,
                responsibilities,
                tools, 
                portfolio
            })
            .then(resp => {
                console.log(resp.data);
                window.location.reload()
            })
            .catch(error => {
                console.log("error: " + error)
            })

        } else {
            /* log error to the console
                - iterate over HTML elements and style inccorect elements
                - do not close display
            */
            console.log("Error: invalid fields in other work Experience form UPDATE");
            Object.keys(wrkExpObj).forEach((key: string, keyIndex: number) => {
                styleInvalidElementsByNameNotNull(document.getElementsByName(key), !errorElems[keyIndex] );
             });

             //set our string error msg
             setValidationErrors(errorElems);
        }
        //Form stays open until they enter data correctly or cancel

    }
    //***********************************************************************/


    //Render work experience on page
    //*********************************************************************/
    const createWorkExperience = (data: any) => {
        const bodyHeaders: Array<string> = [
            "Project Description",
            "Roles / Responsibilites",
            "Tools"
        ]

        for (let index = 0; index < data.length; index++) {
            let headerNum: number = 1
            let workExperience = document.querySelector(".other-work-experience")

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
            bodyContent.push(data[index].tools)
            //***********************************************/

            for (let element in headerContent) {
                let component = document.createElement("h" + headerNum)
                editDiv.appendChild(editButton)
                editDiv.appendChild(deleteButton)
                editDiv.style.float = "right"

                editButton.innerHTML = "Edit"
                editButton.addEventListener("click", () => {
                    setEmployer(data[index].employer)
                    setStartDate(data[index].startDate)
                    setEndDate(data[index].endDate)
                    setTitle(data[index].title)
                    setDescription(data[index].description)
                    setTools(data[index].tools)
                    setResponsibilities(data[index].responsibilities)
                    setId(data[index].id)
                    handleShowUpdateExperience()
                })
                editButton.style.marginRight = "10px"

                deleteButton.innerHTML = "Delete"
                deleteButton.addEventListener("click", () => {
                    setId(data[index].id)
                    handleShowDeleteOWE();
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

    return (
        <div className="container">

        {/* this is the card for the other work experience component */}
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>
                        Other Work Experience
                        <QuestionCircle id="card-info" onClick={handleShowDetails}/>
                        <Tooltip target="card-info" isOpen={detailsTooltipOpenOWE} toggle={toggleDetails}>Details</Tooltip>
                        <PlusCircle id="add-other-work-experience" onClick={handleShow}/>
                        <Tooltip target="add-other-work-experience" isOpen={addTooltipOpenOWE} toggle={toggleAddOWE}>Add Other Work Experience</Tooltip>
                    </h4>
                </Card.Header>
                <Card.Body id="card-body">
                    <Card.Text className="other-work-experience"></Card.Text>
                </Card.Body>
            </Card>


        {/* this is the form input to create a new work experience  */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add Other Work Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSave}>
                        <h6>Employer Name</h6>
                        <input type="text" name="employer" className="form-input" onChange={e => setEmployer(e.target.value)}/>
                        <h6>Start Date</h6>
                        <input type="date" name="startDate" className="form-input" placeholder="" onChange={ (e) => setStartDate(e.target.value)}/>
                        <h6>End Date</h6>
                        <input type="date" name="endDate" className="form-input" placeholder="" onChange={ (e) => setEndDate(e.target.value)}/>
                        <h6>Job Title</h6>
                        <input type="text" name="title" className="form-input" onChange={ (e)=> setTitle(e.target.value) }/>
                        <h6>Roles / Responsibilities</h6>
                        <textarea name="responsibilities" className="form-input" style={{height: "100px"}} onChange={ (e) => setResponsibilities(e.target.value)}/> 
                        <h6>Problem Description</h6> 
                        <textarea name="description" className="form-input" style={{height: "100px"}} onChange={ (e) => setDescription(e.target.value)}/>
                        <h6>Tools / Technologies</h6>
                        <textarea name="tools" className="form-input" style={{height: "100px"}} onChange={ (e) => setTools(e.target.value)}/>
                    </form>

                     {/* error msgs go here in list */ }
                     <ValidationMsg errors={validationErrors}></ValidationMsg>

                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" className="" onClick={handleClose}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={()=>{ handleSave();}}>Add</Button>
                </Modal.Footer>
            </Modal>

        {/* this is for the text that shows up after clicking the question mark button */}
            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header>
                    <Modal.Title>Details</Modal.Title>
                    <XCircle id="work-experience-details" onClick={handleCloseDetails}/>
                </Modal.Header>
                <Modal.Body>
                    <p>This section is used to mention your relevant work experience prior to Revature.
                        <br/>
                        <br/>
                        Please, ensure that your previous work experience relate to your curriculum at Revature.
                    </p>
                </Modal.Body>
            </Modal>

        {/* this updates an existing entry for other work experience */}
            <Modal show={showUpdateExperience} onHide={handleCloseUpdateExperience} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Edit Work Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <h6>Employer Name</h6>
                            <input type="text" name="employer" className="form-input" value={employer} onChange={e => setEmployer(e.target.value)}/>
                            <h6>From</h6>
                            <input type="date" name="startDate" className="form-input" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                            <h6>To</h6>
                            <input type="date" name="endDate" className="form-input" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                            <h6>Job Title</h6>
                            <input type="text" name="title" className="form-input" value={title} onChange={e => setTitle(e.target.value)}/>
                            <h6>Roles / Responsibilites</h6>
                            <textarea name="responsibilites" className="form-input work-experience-textarea" style={{height: "100px"}} value={responsibilities} onChange={e => setResponsibilities(e.target.value)}></textarea>
                            <h6>Tools / Technologies</h6>
                            <textarea name="technologies" className="form-input work-experience-textarea" style={{height: "100px"}} value={tools} onChange={e => setTools(e.target.value)}></textarea>
                            <h6>Problem Desciption</h6>
                            <textarea name="description" className="form-input work-experience-textarea" style={{height: "100px"}} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </form>

                        {/* error msgs go here in list */ }
                        <ValidationMsg errors={validationErrors}></ValidationMsg>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdateExperience}>Close</Button>
                        <Button variant="primary" className="oButton" onClick={() => {handleUpdate(id)}}>Update</Button>
                    </Modal.Footer>
                </Modal>
                {/* this will popup to make sure the user wants to delete a card */}
                <Modal show={showDeleteOWE} onHide={handleCloseDeleteOWE} backdrop="static">
                    <Modal.Header>Delete Warning</Modal.Header>
                    <Modal.Body><p>This will permanantly delete this info. Are you sure?</p></Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {handleDelete(id)}}>Yes, Permanantly Delete</Button>
                        <Button variant="secondary" onClick={handleCloseDeleteOWE}>Close</Button>
                    </Modal.Footer>
                </Modal>

        </div>
    )
}

export default OtherWorkExperience
